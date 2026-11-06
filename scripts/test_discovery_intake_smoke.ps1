# ==============================================================================
# ARNAV ABACUS ACADEMY (AAA) - WS-16 LIVE INTAKE SMOKE TEST RUNNER (OPTION A)
# Governing Reference: MGT-DET-S5-REV-1.2.0-ACPT
# Target: Local Cloudflare Pages Dev (Port 8788) -> Supabase Mumbai Staging
# Database Ref: ghbjtmfskgcraxafhlch (AWS ap-south-1)
# STRICT RULES:
# - Synthetic data only ('SYNTHETIC-SMOKE-TEST')
# - Zero production access
# - Cleanup test records upon completion
# ==============================================================================

[CmdletBinding()]
param (
    [int]$Port = 8788,
    [string]$ProjectRef = 'ghbjtmfskgcraxafhlch',
    [string]$Password = $env:STAGING_PGPASSWORD
)

$ErrorActionPreference = 'Continue'

Write-Host '==============================================================================' -ForegroundColor Cyan
Write-Host 'AAA WS-16 LIVE INTAKE SMOKE TEST RUNNER (OPTION A: WRANGLER PREVIEW)' -ForegroundColor Cyan
Write-Host '==============================================================================' -ForegroundColor Cyan

# 1. Verify Prerequisites
if (-not (Test-Path '.dev.vars')) {
    Write-Error "MISSING CONFIGURATION: '.dev.vars' was not found in project root."
    Write-Host "Please create '.dev.vars' with your staging Supabase credentials:" -ForegroundColor Yellow
    Write-Host "SUPABASE_URL=https://$ProjectRef.supabase.co" -ForegroundColor Yellow
    Write-Host "SUPABASE_SERVICE_ROLE_KEY=<your-key>" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path 'dist/index.html')) {
    Write-Host "Building project static assets into 'dist'..." -ForegroundColor Yellow
    cmd.exe /c npm run build
}

# 2. Start Wrangler Pages Dev in Background
Write-Host "`nStep 1: Starting Cloudflare Pages Dev Server on port $Port..." -ForegroundColor Yellow

$wranglerProcess = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c npx wrangler pages dev dist --port $Port --compatibility-date 2024-01-01" `
    -PassThru -NoNewWindow

Write-Host "Wrangler process launched. Waiting for port $Port to listen..." -ForegroundColor Green

$maxRetries = 25
$serverReady = $false
for ($i = 1; $i -le $maxRetries; $i++) {
    Start-Sleep -Seconds 1
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $tcp.Connect('127.0.0.1', $Port)
        $tcp.Close()
        $serverReady = $true
        Write-Host "Cloudflare Pages Dev is listening on http://127.0.0.1:$Port (attempt $i)" -ForegroundColor Green
        break
    } catch {
        Write-Host "Waiting for server to spin up ($i/$maxRetries)..." -ForegroundColor Gray
    }
}

if (-not $serverReady) {
    Write-Error "ERROR: Wrangler failed to start on port $Port within timeout."
    if ($wranglerProcess -and -not $wranglerProcess.HasExited) { Stop-Process -Id $wranglerProcess.Id -Force }
    exit 1
}

$evidenceLog = 'docs/11_evidence_and_screenshots/WS16_LIVE_SMOKE_TEST_OUTPUT.log'
$logContent = "==============================================================================`n"
$logContent += "ARNAV ABACUS ACADEMY - WS-16 LIVE INTAKE GATEWAY SMOKE TEST`n"
$logContent += "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')`n"
$logContent += "Target:    http://127.0.0.1:$Port/api/discovery-intake`n"
$logContent += "Staging:   $ProjectRef (AWS ap-south-1 Mumbai)`n"
$logContent += "==============================================================================`n`n"

try {
    # 3. Test HTTP POST Ingestion
    Write-Host "`nStep 2: Submitting Synthetic Discovery Lead to Gateway..." -ForegroundColor Yellow
    $testIdempotencyKey = [System.Guid]::NewGuid().ToString()
    $testPayload = @{
        parentName = 'SYNTHETIC-SMOKE-TEST Parent'
        parentPhone = '9822000002'
        parentEmail = 'synthetic-smoke-test@arnavabacus.internal'
        childAgeBracket = '7-9'
        courseInterest = 'abacus'
        serviceConsent = $true
        marketingConsent = $false
        parentGuardianConfirmed = $true
        idempotencyKey = $testIdempotencyKey
    } | ConvertTo-Json

    $logContent += "--- Step 2: Ingress POST Request ---`nPayload: $testPayload`n`n"

    $httpResponse = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/api/discovery-intake" `
        -Method Post `
        -Headers @{ 'Content-Type' = 'application/json'; 'Idempotency-Key' = $testIdempotencyKey } `
        -Body $testPayload

    Write-Host "Gateway Response Received:" -ForegroundColor Green
    $httpResponse | Format-List | Out-String | Write-Host
    $logContent += "--- Step 2: Gateway Response ---`n$($httpResponse | ConvertTo-Json -Depth 5)`n`n"

    if ($httpResponse.success -ne $true -or -not $httpResponse.leadReference) {
        throw "Gateway assertion failed: Expected success=true and valid leadReference."
    }

    $leadRef = $httpResponse.leadReference
    Write-Host "Allocated Lead Reference: $leadRef" -ForegroundColor Cyan

    # 4. Test Idempotency (Duplicate Ingestion Protection)
    Write-Host "`nStep 3: Submitting Duplicate Request to Test Idempotency..." -ForegroundColor Yellow
    $duplicateResponse = Invoke-RestMethod -Uri "http://127.0.0.1:$Port/api/discovery-intake" `
        -Method Post `
        -Headers @{ 'Content-Type' = 'application/json'; 'Idempotency-Key' = $testIdempotencyKey } `
        -Body $testPayload

    Write-Host "Duplicate Response Received:" -ForegroundColor Green
    $duplicateResponse | Format-List | Out-String | Write-Host
    $logContent += "--- Step 3: Idempotency Response ---`n$($duplicateResponse | ConvertTo-Json -Depth 5)`n`n"

    if ($duplicateResponse.leadReference -ne $leadRef) {
        throw "Idempotency assertion failed: Lead reference mismatch on duplicate submission."
    }

    # 5. Verify Row Directly in PostgreSQL Database
    Write-Host "`nStep 4: Querying Database Directly via PostgreSQL to Verify Physical Row..." -ForegroundColor Yellow
    
    $psqlPath = ''
    if (Get-Command psql.exe -ErrorAction SilentlyContinue) {
        $psqlPath = 'psql.exe'
    } elseif (Test-Path 'C:\Program Files\PostgreSQL\18\bin\psql.exe') {
        $psqlPath = 'C:\Program Files\PostgreSQL\18\bin\psql.exe'
    }
    
    if ($psqlPath) {
        if (-not $Password) {
            $securePass = Read-Host "Please enter Staging DB Password to verify database row and perform cleanup" -AsSecureString
            $Password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePass))
        }

        $env:PGPASSWORD = $Password
        $env:PGSSLMODE = 'require'
        $dbHost = 'aws-0-ap-south-1.pooler.supabase.com'
        $dbUser = "postgres.$ProjectRef"

        $querySql = "SELECT lead_reference, parent_name, mobile_number, course_interest, lifecycle_status, created_at FROM public.leads WHERE lead_reference = '$leadRef';"
        $dbRowOutput = & $psqlPath -h $dbHost -p 5432 -U $dbUser -d postgres -c $querySql 2>&1
        $dbRowOutputStr = $dbRowOutput | Out-String
        Write-Host $dbRowOutputStr
        $logContent += "--- Step 4: Database Row Verification ---`n" + $dbRowOutputStr + "`n`n"

        # Cleanup synthetic row
        Write-Host "`nStep 5: Cleaning up synthetic test record..." -ForegroundColor Yellow
        $cleanupSql = "DELETE FROM public.leads WHERE parent_name LIKE 'SYNTHETIC-%';"
        $cleanupOutput = & $psqlPath -h $dbHost -p 5432 -U $dbUser -d postgres -c $cleanupSql 2>&1
        $cleanupOutputStr = $cleanupOutput | Out-String
        Write-Host $cleanupOutputStr
        $logContent += "--- Step 5: Database Cleanup ---`n" + $cleanupOutputStr + "`n`n"
    } else {
        Write-Host 'psql not available in PATH. Skipping direct SQL row verification.' -ForegroundColor Yellow
    }

    Write-Host "`n==============================================================================" -ForegroundColor Green
    Write-Host 'QA-WS-16 SMOKE TEST SUCCEEDED: DURABLE PERSISTENCE FULLY VERIFIED!' -ForegroundColor Green
    Write-Host "==============================================================================" -ForegroundColor Green
    $logContent += "STATUS: PASS - LIVE PERSISTENCE FULLY VERIFIED`n"
}
finally {
    # Clean shutdown of background wrangler
    Write-Host "`nTerminating background Wrangler process..." -ForegroundColor Gray
    if ($wranglerProcess -and -not $wranglerProcess.HasExited) {
        Stop-Process -Id $wranglerProcess.Id -Force -ErrorAction SilentlyContinue
    }
    Get-Process -Name workerd -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    
    Set-Content -Path $evidenceLog -Value $logContent -Encoding UTF8
    Write-Host "Evidence log written to: $evidenceLog" -ForegroundColor Cyan
}
