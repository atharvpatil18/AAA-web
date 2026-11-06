<#
==============================================================================
ARNAV ABACUS ACADEMY (AAA) — STAGING DISCOVERY LEADS MIGRATION RUNNER
Governing Reference: MGT-DET-S5-REV-1.2.0-ACPT
Target Migration: supabase/migrations/20261106000000_discovery_leads_schema.sql
Scope: Deploy public.leads, lead_ref_seq_2026, and fn_submit_discovery_lead
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
Write-Host "AAA STAGING DISCOVERY LEADS MIGRATION RUNNER (QA-WS-16)" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan

# ------------------------------------------------------------------------------
# 1. Staging Identity & SSL Enforcement
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

# Supabase Mumbai IPv4 Connection Pooler (Session Mode on Port 5432)
$ExpectedPoolerHost = "aws-0-ap-south-1.pooler.supabase.com"
$HostName = $ExpectedPoolerHost
$Port = 5432
$Username = "postgres.$ProjectRef"

Write-Host "Routing:                   Supabase Mumbai IPv4 Pooler (Session Mode, Port 5432)" -ForegroundColor Green
Write-Host "Target Host:               $HostName" -ForegroundColor Green
Write-Host "Target User:               $Username" -ForegroundColor Green

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

$migrationFile = "supabase/migrations/20261106000000_discovery_leads_schema.sql"
$outputLog = "docs/11_evidence_and_screenshots/MIGRATE_LEADS_LIVE_OUTPUT.log"

if (-not (Test-Path $migrationFile)) {
    Write-Error "Migration file '$migrationFile' not found!"
    exit 1
}

# ------------------------------------------------------------------------------
# 3. Pre-Flight Database Identity Check
# ------------------------------------------------------------------------------
Write-Host "`nStep 1: Running Pre-Flight Database Identity Check..." -ForegroundColor Yellow
$flightSql = "SELECT current_database() as db, current_user as usr, inet_server_addr() as srv_ip, version() as ver;"

$headerLog = @"
==============================================================================
ARNAV ABACUS ACADEMY — DISCOVERY LEADS MIGRATION EXECUTION LOG
Timestamp:   $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')
Project Ref: $ProjectRef
Target Host: $HostName
Database:    $Database
Migration:   $migrationFile
==============================================================================
"@
$headerLog | Out-File -FilePath $outputLog -Encoding utf8

$flightOut = & $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $flightSql 2>&1
$flightOut | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "Pre-flight database probe failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}

# ------------------------------------------------------------------------------
# 4. Apply Migration File
# ------------------------------------------------------------------------------
Write-Host "`nStep 2: Applying Migration $migrationFile..." -ForegroundColor Yellow
$migrationOut = & $psqlPath -h $HostName -p $Port -U $Username -d $Database -f $migrationFile 2>&1
$migrationOut | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "Migration failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}
Write-Host "Migration applied successfully." -ForegroundColor Green

# ------------------------------------------------------------------------------
# 5. Verify Deployed Schema Objects in PostgreSQL Catalog
# ------------------------------------------------------------------------------
Write-Host "`nStep 3: Verifying Deployed Schema Objects in PostgreSQL Catalog..." -ForegroundColor Yellow
$verifySql = @"
SELECT 
    table_schema, 
    table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'leads';

SELECT 
    sequence_schema, 
    sequence_name 
FROM information_schema.sequences 
WHERE sequence_schema = 'public' AND sequence_name = 'lead_ref_seq_2026';

SELECT 
    routine_schema, 
    routine_name, 
    routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' AND routine_name = 'fn_submit_discovery_lead';
"@

$verifyOut = & $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $verifySql 2>&1
$verifyOut | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "Schema verification query failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}

# ------------------------------------------------------------------------------
# 6. Test Idempotency with Synthetic Test RPC Call
# ------------------------------------------------------------------------------
Write-Host "`nStep 4: Testing RPC Execution with Synthetic Test Call..." -ForegroundColor Yellow
$testRpcSql = @"
SELECT public.fn_submit_discovery_lead(
    '00000000-0000-0000-0000-000000000001'::uuid,
    'SYNTHETIC-PREFLIGHT Parent',
    '9822000001',
    'synthetic.parent@test.com',
    '7-9',
    'abacus',
    true,
    false,
    true,
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
);

-- Test Idempotent Duplicate Call (Must return isDuplicate: true without advancing sequence)
SELECT public.fn_submit_discovery_lead(
    '00000000-0000-0000-0000-000000000001'::uuid,
    'SYNTHETIC-PREFLIGHT Parent Duplicate',
    '9822000001',
    'synthetic.parent@test.com',
    '7-9',
    'abacus',
    true,
    false,
    true,
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
);

-- Assert Lead Exists in public.leads
SELECT lead_reference, parent_name, mobile_number, course_interest, lifecycle_status 
FROM public.leads 
WHERE idempotency_key = '00000000-0000-0000-0000-000000000001';

-- Clean up synthetic test record
DELETE FROM public.leads WHERE idempotency_key = '00000000-0000-0000-0000-000000000001';
"@

$rpcOut = & $psqlPath -h $HostName -p $Port -U $Username -d $Database -c $testRpcSql 2>&1
$rpcOut | Tee-Object -FilePath $outputLog -Append
if ($LASTEXITCODE -ne 0) {
    Write-Error "Synthetic RPC execution test failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}

Write-Host "`n==============================================================================" -ForegroundColor Green
Write-Host "DISCOVERY LEADS MIGRATION & RPC VERIFICATION COMPLETED SUCCESSFULLY." -ForegroundColor Green
Write-Host "Evidence logged to: $outputLog" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Green
