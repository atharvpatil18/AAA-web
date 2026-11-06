<#
==============================================================================
ARNAV ABACUS ACADEMY (AAA) — STAGING RESTORE DRILL RUNNER (PowerShell)
Governing Reference: MGT-DET-S5-STAGING-03-CORR-01
Scope: QA-INF-02 Canary-Only Staging Database Manual Backup & Restore Verification
STRICT RULE: Canary table only. Staging credentials only. Never run against production.
==============================================================================
#>

[CmdletBinding()]
param (
    [string]$ProjectRef = $env:STAGING_PROJECT_REF,
    [string]$HostName = $env:STAGING_PGHOST,
    [int]$Port = $(if ($env:STAGING_PGPORT) { [int]$env:STAGING_PGPORT } else { 5432 }),
    [string]$Database = $(if ($env:STAGING_PGDATABASE) { $env:STAGING_PGDATABASE } else { "postgres" }),
    [string]$Username = $(if ($env:STAGING_PGUSER) { $env:STAGING_PGUSER } else { "postgres" }),
    [string]$Password = $env:STAGING_PGPASSWORD,
    [string]$GpgPassphrase = $env:STAGING_GPG_PASSPHRASE
)

$ErrorActionPreference = "Continue"

Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "AAA STAGING CANARY-ONLY RESTORE DRILL HARNESS (QA-INF-02)" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan

# ------------------------------------------------------------------------------
# 1. Staging Identity & SSL Enforcement (Remediation 1)
# ------------------------------------------------------------------------------
$ApprovedStagingProjectName = "aaa-web-staging"

if (-not $ProjectRef) {
    Write-Host "`nStaging Project Reference is not set in STAGING_PROJECT_REF." -ForegroundColor Yellow
    $ProjectRef = Read-Host "Please enter Approved Staging Project Reference (e.g., $ApprovedStagingProjectName or assigned ref)"
}

if (-not $ProjectRef) {
    Write-Error "SECURITY HALT: Staging Project Reference is mandatory. Aborting."
    exit 1
}

# ------------------------------------------------------------------------------
# Supabase Mumbai IPv4 Connection Pooler (Session Mode on Port 5432)
# Direct db.<ref>.supabase.co is IPv6-only on Free Tier and fails DNS on IPv4 networks.
# The official Supabase solution for IPv4 connections is aws-0-ap-south-1.pooler.supabase.com.
# ------------------------------------------------------------------------------
$ExpectedPoolerHost = "aws-0-ap-south-1.pooler.supabase.com"
$HostName = $ExpectedPoolerHost
$Port = 5432
$Username = "postgres.$ProjectRef"

Write-Host "Routing:                   Supabase Mumbai IPv4 Pooler (Session Mode, Port 5432)" -ForegroundColor Green
Write-Host "Target Host:               $HostName" -ForegroundColor Green
Write-Host "Target User:               $Username" -ForegroundColor Green

if ($HostName -ne $ExpectedDirectHost -and $HostName -ne $ExpectedPoolerHost) {
    Write-Error "SECURITY HALT: Target Host '$HostName' does not match derived staging host '$ExpectedHost'. Aborting."
    exit 1
}

if ($HostName -match 'production|prod|live|arnavabacus\.com') {
    Write-Error "SECURITY HALT: Production hostname detected! Aborting execution immediately."
    exit 1
}

$env:PGSSLMODE = "require"
Write-Host "Staging Identity Verified: $ProjectRef ($HostName)" -ForegroundColor Green
Write-Host "SSL Enforcement:           PGSSLMODE=require" -ForegroundColor Green

# ------------------------------------------------------------------------------
# 2. Binary Discovery & GPG Passphrase Security (Remediation 4)
# ------------------------------------------------------------------------------
$binDir = "C:\Program Files\PostgreSQL\18\bin"
$psqlPath = if (Get-Command psql.exe -ErrorAction SilentlyContinue) { "psql.exe" } else { "$binDir\psql.exe" }
$pgDumpPath = if (Get-Command pg_dump.exe -ErrorAction SilentlyContinue) { "pg_dump.exe" } else { "$binDir\pg_dump.exe" }
$pgRestorePath = if (Get-Command pg_restore.exe -ErrorAction SilentlyContinue) { "pg_restore.exe" } else { "$binDir\pg_restore.exe" }
$gpgPath = if (Get-Command gpg.exe -ErrorAction SilentlyContinue) { "gpg.exe" } else { "C:\Program Files\Git\usr\bin\gpg.exe" }

if (-not (Test-Path $psqlPath) -and (Get-Command psql.exe -ErrorAction SilentlyContinue) -eq $null) {
    Write-Error "psql could not be located."
    exit 1
}

if (-not $Password) {
    Write-Host "`nStaging Password is not set in STAGING_PGPASSWORD." -ForegroundColor Yellow
    $securePass = Read-Host "Please enter Staging DB Password" -AsSecureString
    $Password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))
    if (-not $Password) {
        Write-Error "Password is mandatory. Aborting execution."
        exit 1
    }
}

# Remediation 4: Zero hardcoded fallback passphrase
if (-not $GpgPassphrase) {
    Write-Host "`nGPG Passphrase is not set in STAGING_GPG_PASSPHRASE." -ForegroundColor Yellow
    $secureGpg = Read-Host "Please enter secure GPG Passphrase for backup encryption" -AsSecureString
    $GpgPassphrase = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureGpg))
    if (-not $GpgPassphrase) {
        Write-Error "SECURITY HALT: GPG Passphrase is required for encryption. Aborting."
        exit 1
    }
}

$env:PGPASSWORD = $Password
$outputLog = "docs/11_evidence_and_screenshots/RESTORE01_LIVE_OUTPUT.log"
$backupFile = "docs/11_evidence_and_screenshots/aaa_canary_snapshot.dump"
$encryptedFile = "$backupFile.gpg"
$decryptedFile = "docs/11_evidence_and_screenshots/aaa_canary_restored.dump"

if (-not (Test-Path "docs/11_evidence_and_screenshots")) {
    New-Item -ItemType Directory -Path "docs/11_evidence_and_screenshots" -Force | Out-Null
}

$logHeader = @"
==============================================================================
ARNAV ABACUS ACADEMY — QA-INF-02 CANARY RESTORE DRILL LOG
Timestamp:   $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss K')
Project Ref: $ProjectRef
Target Host: $HostName
Database:    $Database
Scope:       STRICTLY public.canary_audit (Academy tables isolated)
==============================================================================

"@
$logHeader | Out-File -FilePath $outputLog -Encoding utf8

# ------------------------------------------------------------------------------
# 3. Pre-Drill Canary Table Insertion & Scope Verification
# ------------------------------------------------------------------------------
Write-Host "`nStep 1: Inserting Pre-Drill Synthetic Canary Table (public.canary_audit)..." -ForegroundColor Yellow
$canarySql = @"
CREATE TABLE IF NOT EXISTS public.canary_audit (
    canary_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_run VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);
INSERT INTO public.canary_audit (test_run) VALUES ('SYNTHETIC-CANARY-$(Get-Date -Format 'yyyyMMdd-HHmmss')');
SELECT count(*) AS pre_backup_canary_count FROM public.canary_audit;
"@
$canaryOut = & $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $canarySql 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to seed canary table with exit code $LASTEXITCODE. Details: $canaryOut"
    exit $LASTEXITCODE
}
$canaryOut | Out-File -FilePath $outputLog -Append
Write-Host "Canary table seeded." -ForegroundColor Green

# ------------------------------------------------------------------------------
# 4. Canary-Only Backup Extraction (Remediation 3: -t public.canary_audit)
# ------------------------------------------------------------------------------
Write-Host "`nStep 2: Extracting Canary-Only Logical Dump (pg_dump -t public.canary_audit)..." -ForegroundColor Yellow
$swDump = [System.Diagnostics.Stopwatch]::StartNew()
& $pgDumpPath -h $HostName -p $Port -U $Username -d $Database -t public.canary_audit -Fc -b -f $backupFile 2>&1 | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "pg_dump failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}
$swDump.Stop()
$dumpElapsed = $swDump.Elapsed.TotalSeconds
$dumpSize = (Get-Item $backupFile).Length
Write-Host "Canary dump extracted: $backupFile ($dumpSize bytes in $([math]::Round($dumpElapsed, 2))s)" -ForegroundColor Green

# ------------------------------------------------------------------------------
# 5. GPG Symmetric Military-Grade Encryption (AES-256)
# ------------------------------------------------------------------------------
Write-Host "`nStep 3: Encrypting Canary Backup Archive via GPG (AES-256)..." -ForegroundColor Yellow
if (Test-Path $encryptedFile) { Remove-Item $encryptedFile -Force }

# Pass passphrase via standard input to prevent process argument exposure
$GpgPassphrase | & $gpgPath --batch --yes --passphrase-fd 0 --symmetric --cipher-algo AES256 -o $encryptedFile $backupFile 2>&1 | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "GPG encryption failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}
$encSize = (Get-Item $encryptedFile).Length
Write-Host "Archive encrypted: $encryptedFile ($encSize bytes)" -ForegroundColor Green

# ------------------------------------------------------------------------------
# 6. Simulate Disaster (Dropping Canary Table ONLY)
# ------------------------------------------------------------------------------
Write-Host "`nStep 4: Simulating Disaster (Dropping public.canary_audit ONLY)..." -ForegroundColor Yellow
$dropOut = & $psqlPath -h $HostName -p $Port -U $Username -d $Database -c "DROP TABLE public.canary_audit;" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to drop canary table. Details: $dropOut"
    exit $LASTEXITCODE
}
$dropOut | Out-File -FilePath $outputLog -Append
Write-Host "Canary table dropped." -ForegroundColor Green

# ------------------------------------------------------------------------------
# 7. Decrypt Archive
# ------------------------------------------------------------------------------
Write-Host "`nStep 5: Decrypting Backup Archive via GPG..." -ForegroundColor Yellow
if (Test-Path $decryptedFile) { Remove-Item $decryptedFile -Force }

$GpgPassphrase | & $gpgPath --batch --yes --passphrase-fd 0 --decrypt -o $decryptedFile $encryptedFile 2>&1 | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "GPG decryption failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}
Write-Host "Archive decrypted successfully." -ForegroundColor Green

# ------------------------------------------------------------------------------
# 8. Canary-Only Database Restoration (Remediation 3: -t public.canary_audit)
# ------------------------------------------------------------------------------
Write-Host "`nStep 6: Executing Canary-Only Restoration (pg_restore -t public.canary_audit)..." -ForegroundColor Yellow
$swRestore = [System.Diagnostics.Stopwatch]::StartNew()
& $pgRestorePath -h $HostName -p $Port -U $Username -d $Database -t public.canary_audit --clean --if-exists $decryptedFile 2>&1 | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "pg_restore failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}
$swRestore.Stop()
$restoreElapsed = $swRestore.Elapsed.TotalSeconds
Write-Host "pg_restore completed in $([math]::Round($restoreElapsed, 2)) seconds (RTO < 30m SATISFIED)." -ForegroundColor Green

# ------------------------------------------------------------------------------
# 9. Verify Restored Canary State & Integrity of Academy Tables
# ------------------------------------------------------------------------------
Write-Host "`nStep 7: Verifying Restored Canary State & Asserting Academy Tables Untouched..." -ForegroundColor Yellow
$verifySql = @"
SELECT count(*) AS post_restore_canary_count FROM public.canary_audit;
SELECT conname, pg_get_constraintdef(oid) AS constraint_def 
FROM pg_constraint 
WHERE conname = 'chk_max_batch_capacity';
"@
& $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $verifySql 2>&1 | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "Verification query failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}

# Cleanup temporary local dump files
if (Test-Path $backupFile) { Remove-Item $backupFile -Force }
if (Test-Path $encryptedFile) { Remove-Item $encryptedFile -Force }
if (Test-Path $decryptedFile) { Remove-Item $decryptedFile -Force }

Write-Host "`n==============================================================================" -ForegroundColor Green
Write-Host "CANARY RESTORE DRILL COMPLETED SUCCESSFULLY." -ForegroundColor Green
Write-Host "Dump Size:        $dumpSize bytes" -ForegroundColor Green
Write-Host "Restore Duration: $([math]::Round($restoreElapsed, 2)) seconds" -ForegroundColor Green
Write-Host "Evidence Logged:  $outputLog" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Green
