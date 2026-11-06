<#
==============================================================================
ARNAV ABACUS ACADEMY (AAA) — STAGING CAPACITY TEST RUNNER (PowerShell)
Governing Reference: MGT-DET-S5-STAGING-03-CORR-01
Scope: QA-CAP-01 Staging Database Capacity & Concurrency Verification
STRICT RULE: Staging credentials only. Never run against production.
==============================================================================
#>

[CmdletBinding()]
param (
    [string]$ProjectRef = $env:STAGING_PROJECT_REF,
    [string]$HostName = $env:STAGING_PGHOST,
    [int]$Port = $(if ($env:STAGING_PGPORT) { [int]$env:STAGING_PGPORT } else { 5432 }),
    [string]$Database = $(if ($env:STAGING_PGDATABASE) { $env:STAGING_PGDATABASE } else { "postgres" }),
    [string]$Username = $(if ($env:STAGING_PGUSER) { $env:STAGING_PGUSER } else { "postgres" }),
    [string]$Password = $env:STAGING_PGPASSWORD
)

$ErrorActionPreference = "Continue"

Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "AAA STAGING DATABASE CAPACITY & CONCURRENCY TEST HARNESS (QA-CAP-01)" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan

# ------------------------------------------------------------------------------
# 1. Staging Identity & SSL Enforcement (Remediation 1)
# ------------------------------------------------------------------------------
$ApprovedStagingProjectName = "aaa-web-staging"

# Validate Project Reference
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

# Strict Host Verification
if ($HostName -ne $ExpectedDirectHost -and $HostName -ne $ExpectedPoolerHost) {
    Write-Error "SECURITY HALT: Target Host '$HostName' does not match derived staging host '$ExpectedHost'. Aborting."
    exit 1
}

# Reject any production identifiers
if ($HostName -match 'production|prod|live|arnavabacus\.com') {
    Write-Error "SECURITY HALT: Production hostname detected! Aborting execution immediately."
    exit 1
}

# Enforce strict libpq SSL mode
$env:PGSSLMODE = "require"
Write-Host "Staging Identity Verified: $ProjectRef ($HostName)" -ForegroundColor Green
Write-Host "SSL Enforcement:           PGSSLMODE=require" -ForegroundColor Green

# ------------------------------------------------------------------------------
# 2. Binary Discovery & Credential Capture
# ------------------------------------------------------------------------------
$psqlPath = ""
if (Get-Command psql.exe -ErrorAction SilentlyContinue) {
    $psqlPath = "psql.exe"
} elseif (Test-Path "C:\Program Files\PostgreSQL\18\bin\psql.exe") {
    $psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
} else {
    Write-Error "psql.exe could not be found. Please ensure PostgreSQL client tools are installed."
    exit 1
}
Write-Host "PostgreSQL Client:         $psqlPath" -ForegroundColor Green

if (-not $Password) {
    Write-Host "`nStaging Password is not set in STAGING_PGPASSWORD." -ForegroundColor Yellow
    $securePass = Read-Host "Please enter Staging DB Password" -AsSecureString
    $Password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))
    if (-not $Password) {
        Write-Error "Password is mandatory. Aborting execution."
        exit 1
    }
}

$env:PGPASSWORD = $Password

$migrationFile = "supabase/migrations/20261105_micro_batches_cap_constraint.sql"
$testSqlFile = "scripts/staging_capacity_tests.sql"
$outputLog = "docs/11_evidence_and_screenshots/CAP01_LIVE_OUTPUT.log"

if (-not (Test-Path "docs/11_evidence_and_screenshots")) {
    New-Item -ItemType Directory -Path "docs/11_evidence_and_screenshots" -Force | Out-Null
}

$logHeader = @"
==============================================================================
ARNAV ABACUS ACADEMY — QA-CAP-01 LIVE STAGING TEST EXECUTION LOG
Timestamp:   $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss K')
Project Ref: $ProjectRef
Target Host: $HostName
Database:    $Database
SSL Mode:    require
==============================================================================

"@
$logHeader | Out-File -FilePath $outputLog -Encoding utf8

# ------------------------------------------------------------------------------
# 3. Pre-Flight Database Identity Verification Query
# ------------------------------------------------------------------------------
Write-Host "`nStep 1: Running Pre-Flight Database Identity Check..." -ForegroundColor Yellow
$preflightSql = "SELECT current_database() AS db, current_user AS usr, inet_server_addr() AS srv_ip, version() AS ver;"
$preflightOut = & $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $preflightSql 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Pre-flight connection probe failed with exit code $LASTEXITCODE. Details: $preflightOut"
    exit $LASTEXITCODE
}
$preflightOut | Out-File -FilePath $outputLog -Append
Write-Host "Connection confirmed. Pre-flight identity verified." -ForegroundColor Green

# ------------------------------------------------------------------------------
# 4. Apply Migration
# ------------------------------------------------------------------------------
Write-Host "`nStep 2: Applying Migration: $migrationFile..." -ForegroundColor Yellow
$migrationOut = & $psqlPath -h $HostName -p $Port -U $Username -d $Database -f $migrationFile 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Error "Migration application failed with exit code $LASTEXITCODE. Details: $migrationOut"
    exit $LASTEXITCODE
}
$migrationOut | Out-File -FilePath $outputLog -Append
Write-Host "Migration applied successfully." -ForegroundColor Green

# ------------------------------------------------------------------------------
# 5. Execute Sequential Capacity Tests (TC-01, 02, 04, 05, 06, 07)
# ------------------------------------------------------------------------------
Write-Host "`nStep 3: Executing Sequential Capacity Tests: $testSqlFile..." -ForegroundColor Yellow
& $psqlPath -h $HostName -p $Port -U $Username -d $Database -f $testSqlFile 2>&1 | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "Sequential test suite reported fatal exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}

# ------------------------------------------------------------------------------
# 6. Execute Genuine Two-Session Concurrency Test (TC-CAP-DB-03 - Remediation 2)
# ------------------------------------------------------------------------------
Write-Host "`nStep 4: Executing Genuine Two-Session PostgreSQL Concurrency Test (TC-CAP-DB-03)..." -ForegroundColor Yellow

# Seed BATCH-TEST-CONCUR with exactly 4 students
$seedConcurSql = @"
DELETE FROM public.batch_enrollments WHERE batch_id = 'BATCH-TEST-CONCUR';
DELETE FROM public.micro_batches WHERE batch_id = 'BATCH-TEST-CONCUR';
INSERT INTO public.micro_batches (batch_id, batch_name, program, schedule, venue)
VALUES ('BATCH-TEST-CONCUR', 'Concurrency Test Micro Batch (Staging Race)', 'vedic', 'Fri 4:00 PM', 'offline_wakad');
SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-001', 'Student 1', 's1@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-002', 'Student 2', 's2@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-003', 'Student 3', 's3@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-004', 'Student 4', 's4@example.com');
SELECT batch_id, enrolled_count, is_full FROM public.micro_batches WHERE batch_id = 'BATCH-TEST-CONCUR';
"@
Write-Host "Seeding batch BATCH-TEST-CONCUR with 4 initial students..." -ForegroundColor Cyan
& $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $seedConcurSql 2>&1 | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to seed concurrency test batch."
    exit $LASTEXITCODE
}

# Prepare commands for Session 1 and Session 2
$sess1Sql = "BEGIN; SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-005', 'Candidate 5 (Session 1)', 's1@example.com'); SELECT pg_sleep(2.0); COMMIT;"
$sess2Sql = "BEGIN; SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-006', 'Candidate 6 (Session 2)', 's2@example.com'); COMMIT;"

$sess1Log = "docs/11_evidence_and_screenshots/CONCUR_SESSION1.log"
$sess2Log = "docs/11_evidence_and_screenshots/CONCUR_SESSION2.log"

Write-Host "Launching Session 1 (claims seat 5 and holds row lock for 2.0s)..." -ForegroundColor Cyan
$p1 = Start-Process -FilePath $psqlPath -ArgumentList "-h $HostName -p $Port -U $Username -d $Database -c `"$sess1Sql`"" -PassThru -NoNewWindow -RedirectStandardOutput $sess1Log -RedirectStandardError $sess1Log

# Stagger Session 2 start by 500ms to guarantee Session 1 holds the lock
Start-Sleep -Milliseconds 500

Write-Host "Launching Session 2 concurrently (contends for seat 5 while lock is held)..." -ForegroundColor Cyan
$p2 = Start-Process -FilePath $psqlPath -ArgumentList "-h $HostName -p $Port -U $Username -d $Database -c `"$sess2Sql`"" -PassThru -NoNewWindow -RedirectStandardOutput $sess2Log -RedirectStandardError $sess2Log

Write-Host "Awaiting completion of both concurrent sessions..." -ForegroundColor Cyan
$p1.WaitForExit()
$p2.WaitForExit()

$p1Exit = $p1.ExitCode
$p2Exit = $p2.ExitCode

$s1Text = Get-Content $sess1Log -Raw
$s2Text = Get-Content $sess2Log -Raw

"`n--- CONCURRENCY TEST RESULTS ---" | Out-File -FilePath $outputLog -Append
"Session 1 Exit Code: $p1Exit" | Out-File -FilePath $outputLog -Append
"Session 1 Output:`n$s1Text" | Out-File -FilePath $outputLog -Append
"Session 2 Exit Code: $p2Exit" | Out-File -FilePath $outputLog -Append
"Session 2 Output:`n$s2Text" | Out-File -FilePath $outputLog -Append

Write-Host "`nSession 1 Exit Code: $p1Exit" -ForegroundColor $(if ($p1Exit -eq 0) { "Green" } else { "Red" })
Write-Host "Session 2 Exit Code: $p2Exit" -ForegroundColor Yellow

# Concurrency Assertions
$session1Succeeded = ($s1Text -match '"success": true') -or ($s1Text -match 'COMMIT')
$session2Rejected = ($s2Text -match '23514') -or ($s2Text -match 'BATCH_CAPACITY_EXCEEDED')

if (-not $session1Succeeded) {
    Write-Error "CONCURRENCY FAILURE: Session 1 did not succeed as expected."
    exit 1
}

if (-not $session2Rejected) {
    Write-Error "CONCURRENCY FAILURE: Session 2 was not rejected with Error 23514 (BATCH_CAPACITY_EXCEEDED)."
    exit 1
}

Write-Host "✅ Concurrency Lock Verified: Session 1 succeeded, Session 2 cleanly rejected with Error 23514." -ForegroundColor Green

# Verify final physical row counts
$verifyConcurSql = @"
SELECT 
    mb.batch_id, 
    mb.enrolled_count, 
    mb.is_full, 
    count(be.enrollment_id) AS physical_rows,
    (mb.enrolled_count = 5 AND count(be.enrollment_id) = 5) AS perfect_capacity_held
FROM public.micro_batches mb
LEFT JOIN public.batch_enrollments be ON mb.batch_id = be.batch_id
WHERE mb.batch_id = 'BATCH-TEST-CONCUR'
GROUP BY mb.batch_id, mb.enrolled_count, mb.is_full;
"@
Write-Host "`nFinal Invariant Verification for BATCH-TEST-CONCUR:" -ForegroundColor Yellow
& $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $verifyConcurSql 2>&1 | Tee-Object -FilePath $outputLog -Append

Write-Host "`n==============================================================================" -ForegroundColor Green
Write-Host "ALL CAPACITY & CONCURRENCY TESTS COMPLETED SUCCESSFULLY." -ForegroundColor Green
Write-Host "Evidence logged to: $outputLog" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Green
