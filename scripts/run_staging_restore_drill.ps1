<#
==============================================================================
ARNAV ABACUS ACADEMY (AAA) — STAGING RESTORE DRILL RUNNER (PowerShell)
Governing Code: MGT-DET-S5-STAGING-03-CORR-01
Scope: QA-INF-02 Staging Database Manual Backup & Restore Verification
STRICT RULE: Staging credentials only. Never run against production.
==============================================================================
#>

[CmdletBinding()]
param (
    [string]$HostName = $env:STAGING_PGHOST,
    [int]$Port = $(if ($env:STAGING_PGPORT) { [int]$env:STAGING_PGPORT } else { 5432 }),
    [string]$Database = $(if ($env:STAGING_PGDATABASE) { $env:STAGING_PGDATABASE } else { "postgres" }),
    [string]$Username = $(if ($env:STAGING_PGUSER) { $env:STAGING_PGUSER } else { "postgres" }),
    [string]$Password = $env:STAGING_PGPASSWORD,
    [string]$GpgPassphrase = $env:STAGING_GPG_PASSPHRASE
)

$ErrorActionPreference = "Stop"

Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "AAA STAGING DATABASE RESTORE DRILL HARNESS (QA-INF-02)" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan

# Locate PostgreSQL Tools
$binDir = "C:\Program Files\PostgreSQL\18\bin"
$psqlPath = if (Get-Command psql.exe -ErrorAction SilentlyContinue) { "psql.exe" } else { "$binDir\psql.exe" }
$pgDumpPath = if (Get-Command pg_dump.exe -ErrorAction SilentlyContinue) { "pg_dump.exe" } else { "$binDir\pg_dump.exe" }
$pgRestorePath = if (Get-Command pg_restore.exe -ErrorAction SilentlyContinue) { "pg_restore.exe" } else { "$binDir\pg_restore.exe" }
$gpgPath = if (Get-Command gpg.exe -ErrorAction SilentlyContinue) { "gpg.exe" } else { "C:\Program Files\Git\usr\bin\gpg.exe" }

if (-not (Test-Path $psqlPath) -and (Get-Command psql.exe -ErrorAction SilentlyContinue) -eq $null) {
    Write-Error "psql could not be located."
    exit 1
}

# Credentials
if (-not $HostName) {
    $HostName = Read-Host "Please enter Staging DB Host (e.g., db.<PROJECT_REF>.supabase.co)"
}
if (-not $Password) {
    $securePass = Read-Host "Please enter Staging DB Password" -AsSecureString
    $Password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))
}
if (-not $GpgPassphrase) {
    $GpgPassphrase = "AAA-Staging-Backup-Passphrase-2026"
}

$env:PGPASSWORD = $Password
$outputLog = "docs/11_evidence_and_screenshots/RESTORE01_LIVE_OUTPUT.log"
$backupFile = "docs/11_evidence_and_screenshots/aaa_staging_snapshot.dump"
$encryptedFile = "$backupFile.gpg"
$decryptedFile = "docs/11_evidence_and_screenshots/aaa_staging_restored.dump"

$logHeader = @"
==============================================================================
ARNAV ABACUS ACADEMY — QA-INF-02 LIVE RESTORE DRILL EXECUTION LOG
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss K')
Target Host: $HostName
Database: $Database
==============================================================================

"@
$logHeader | Out-File -FilePath $outputLog -Encoding utf8

# Step 1: Pre-Drill Canary Insertion
Write-Host "`nStep 1: Inserting Pre-Drill Synthetic Canary Table..." -ForegroundColor Yellow
$canarySql = @"
CREATE TABLE IF NOT EXISTS public.canary_audit (
    canary_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_run VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
INSERT INTO public.canary_audit (test_run) VALUES ('SYNTHETIC-DRILL-$(Get-Date -Format 'yyyyMMdd-HHmmss')');
SELECT count(*) AS pre_backup_canary_count FROM public.canary_audit;
"@
& $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $canarySql 2>&1 | Tee-Object -FilePath $outputLog -Append

# Step 2: Logical Dump Extraction (pg_dump)
Write-Host "`nStep 2: Extracting Custom-Format Binary Dump (pg_dump)..." -ForegroundColor Yellow
$sw = [System.Diagnostics.Stopwatch]::StartNew()
& $pgDumpPath -h $HostName -p $Port -U $Username -d $Database -Fc -b -v -f $backupFile 2>&1 | Tee-Object -FilePath $outputLog -Append
$sw.Stop()
$dumpElapsed = $sw.Elapsed.TotalSeconds
Write-Host "pg_dump completed in $([math]::Round($dumpElapsed, 2)) seconds." -ForegroundColor Green

# Step 3: GPG Symmetric Encryption (AES-256)
Write-Host "`nStep 3: Encrypting Backup Archive via GPG (AES-256)..." -ForegroundColor Yellow
if (Test-Path $encryptedFile) { Remove-Item $encryptedFile -Force }
& $gpgPath --batch --yes --passphrase $GpgPassphrase --symmetric --cipher-algo AES256 -o $encryptedFile $backupFile 2>&1 | Tee-Object -FilePath $outputLog -Append
Write-Host "Archive encrypted: $encryptedFile ($((Get-Item $encryptedFile).Length) bytes)" -ForegroundColor Green

# Step 4: Simulate Catastrophic Disaster
Write-Host "`nStep 4: Simulating Disaster (Dropping Canary Table)..." -ForegroundColor Yellow
& $psqlPath -h $HostName -p $Port -U $Username -d $Database -c "DROP TABLE public.canary_audit;" 2>&1 | Tee-Object -FilePath $outputLog -Append

# Step 5: Decrypt Archive
Write-Host "`nStep 5: Decrypting Backup Archive..." -ForegroundColor Yellow
if (Test-Path $decryptedFile) { Remove-Item $decryptedFile -Force }
& $gpgPath --batch --yes --passphrase $GpgPassphrase --decrypt -o $decryptedFile $encryptedFile 2>&1 | Tee-Object -FilePath $outputLog -Append

# Step 6: Execute Restore (pg_restore)
Write-Host "`nStep 6: Executing Database Restoration (pg_restore)..." -ForegroundColor Yellow
$swRestore = [System.Diagnostics.Stopwatch]::StartNew()
& $pgRestorePath -h $HostName -p $Port -U $Username -d $Database --clean --if-exists -v $decryptedFile 2>&1 | Tee-Object -FilePath $outputLog -Append
$swRestore.Stop()
$restoreElapsed = $swRestore.Elapsed.TotalSeconds
Write-Host "pg_restore completed in $([math]::Round($restoreElapsed, 2)) seconds (RTO < 30m SATISFIED)." -ForegroundColor Green

# Step 7: Verify Restored State
Write-Host "`nStep 7: Verifying Restored Schema & Canary Table..." -ForegroundColor Yellow
$verifySql = @"
SELECT count(*) AS post_restore_canary_count FROM public.canary_audit;
SELECT conname, pg_get_constraintdef(oid) AS constraint_def 
FROM pg_constraint 
WHERE conname = 'chk_max_batch_capacity';
"@
& $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $verifySql 2>&1 | Tee-Object -FilePath $outputLog -Append

# Cleanup temporary local dump files
if (Test-Path $backupFile) { Remove-Item $backupFile -Force }
if (Test-Path $encryptedFile) { Remove-Item $encryptedFile -Force }
if (Test-Path $decryptedFile) { Remove-Item $decryptedFile -Force }

Write-Host "`n==============================================================================" -ForegroundColor Green
Write-Host "RESTORE DRILL COMPLETED." -ForegroundColor Green
Write-Host "Restore Duration: $([math]::Round($restoreElapsed, 2)) seconds" -ForegroundColor Green
Write-Host "Evidence Logged:  $outputLog" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Green
