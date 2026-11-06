<#
==============================================================================
ARNAV ABACUS ACADEMY (AAA) — STAGING CAPACITY TEST RUNNER (PowerShell)
Governing Code: MGT-DET-S5-STAGING-03-CORR-01
Scope: QA-CAP-01 Staging Database Capacity Verification
STRICT RULE: Staging credentials only. Never run against production.
==============================================================================
#>

[CmdletBinding()]
param (
    [string]$HostName = $env:STAGING_PGHOST,
    [int]$Port = $(if ($env:STAGING_PGPORT) { [int]$env:STAGING_PGPORT } else { 5432 }),
    [string]$Database = $(if ($env:STAGING_PGDATABASE) { $env:STAGING_PGDATABASE } else { "postgres" }),
    [string]$Username = $(if ($env:STAGING_PGUSER) { $env:STAGING_PGUSER } else { "postgres" }),
    [string]$Password = $env:STAGING_PGPASSWORD
)

$ErrorActionPreference = "Stop"

Write-Host "==============================================================================" -ForegroundColor Cyan
Write-Host "AAA STAGING DATABASE CAPACITY TEST HARNESS (QA-CAP-01)" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Cyan

# Locate psql.exe
$psqlPath = ""
if (Get-Command psql.exe -ErrorAction SilentlyContinue) {
    $psqlPath = "psql.exe"
} elseif (Test-Path "C:\Program Files\PostgreSQL\18\bin\psql.exe") {
    $psqlPath = "C:\Program Files\PostgreSQL\18\bin\psql.exe"
} else {
    Write-Error "psql.exe could not be found. Please ensure PostgreSQL client tools are installed."
    exit 1
}
Write-Host "Using PostgreSQL Client: $psqlPath" -ForegroundColor Green

# Validate HostName
if (-not $HostName) {
    Write-Host "`nStaging HostName is not set in STAGING_PGHOST." -ForegroundColor Yellow
    $HostName = Read-Host "Please enter Staging DB Host (e.g., db.<PROJECT_REF>.supabase.co)"
    if (-not $HostName) {
        Write-Error "HostName is mandatory. Aborting execution."
        exit 1
    }
}

# Validate Password
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

Write-Host "`nTarget Host:     $HostName" -ForegroundColor Cyan
Write-Host "Target Database: $Database" -ForegroundColor Cyan
Write-Host "Target User:     $Username" -ForegroundColor Cyan
Write-Host "Region:          AWS ap-south-1 (Mumbai)" -ForegroundColor Cyan

# 1. Apply Migration
Write-Host "`n1. Applying Migration: $migrationFile..." -ForegroundColor Yellow
& $psqlPath -h $HostName -p $Port -U $Username -d $Database -f $migrationFile
if ($LASTEXITCODE -ne 0) {
    Write-Error "Migration application failed with exit code $LASTEXITCODE."
    exit $LASTEXITCODE
}
Write-Host "Migration applied successfully." -ForegroundColor Green

# 2. Execute Seven Capacity Tests
Write-Host "`n2. Executing Seven Capacity Tests: $testSqlFile..." -ForegroundColor Yellow
$logHeader = @"
==============================================================================
ARNAV ABACUS ACADEMY — QA-CAP-01 LIVE STAGING TEST EXECUTION LOG
Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss K')
Target Host: $HostName
Database: $Database
==============================================================================

"@

$logHeader | Out-File -FilePath $outputLog -Encoding utf8

& $psqlPath -h $HostName -p $Port -U $Username -d $Database -f $testSqlFile 2>&1 | Tee-Object -FilePath $outputLog -Append

Write-Host "`n==============================================================================" -ForegroundColor Green
Write-Host "CAPACITY TEST RUN COMPLETED." -ForegroundColor Green
Write-Host "Raw execution evidence recorded to: $outputLog" -ForegroundColor Cyan
Write-Host "==============================================================================" -ForegroundColor Green
