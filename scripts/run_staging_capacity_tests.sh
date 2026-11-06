#!/usr/bin/env bash
# ==============================================================================
# ARNAV ABACUS ACADEMY (AAA) — STAGING CAPACITY TEST RUNNER (Bash)
# Governing Code: MGT-DET-S5-STAGING-03-CORR-01
# Scope: QA-CAP-01 Staging Database Capacity Verification
# STRICT RULE: Staging credentials only. Never run against production.
# ==============================================================================

set -euo pipefail

echo "=============================================================================="
echo "AAA STAGING DATABASE CAPACITY TEST HARNESS (QA-CAP-01)"
echo "=============================================================================="

HOST="${STAGING_PGHOST:-}"
PORT="${STAGING_PGPORT:-5432}"
DATABASE="${STAGING_PGDATABASE:-postgres}"
USER="${STAGING_PGUSER:-postgres}"
PASSWORD="${STAGING_PGPASSWORD:-}"

if [ -z "$HOST" ]; then
    read -p "Please enter Staging DB Host (e.g., db.<PROJECT_REF>.supabase.co): " HOST
fi

if [ -z "$PASSWORD" ]; then
    read -s -p "Please enter Staging DB Password: " PASSWORD
    echo ""
fi

export PGPASSWORD="$PASSWORD"

PSQL_BIN="psql"
if ! command -v psql &> /dev/null; then
    if [ -f "/c/Program Files/PostgreSQL/18/bin/psql.exe" ]; then
        PSQL_BIN="/c/Program Files/PostgreSQL/18/bin/psql.exe"
    else
        echo "Error: psql command not found."
        exit 1
    fi
fi

MIGRATION="supabase/migrations/20261105_micro_batches_cap_constraint.sql"
TEST_SQL="scripts/staging_capacity_tests.sql"
OUTPUT_LOG="docs/11_evidence_and_screenshots/CAP01_LIVE_OUTPUT.log"

mkdir -p "docs/11_evidence_and_screenshots"

echo "Target Host: $HOST"
echo "Target DB:   $DATABASE"
echo "Target User: $USER"
echo "Region:      AWS ap-south-1 (Mumbai)"

echo -e "\n1. Applying Migration: $MIGRATION..."
"$PSQL_BIN" -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -f "$MIGRATION"

echo -e "\n2. Executing Seven Capacity Tests: $TEST_SQL..."
cat <<EOF > "$OUTPUT_LOG"
==============================================================================
ARNAV ABACUS ACADEMY — QA-CAP-01 LIVE STAGING TEST EXECUTION LOG
Timestamp: $(date -u)
Target Host: $HOST
Database: $DATABASE
==============================================================================

EOF

"$PSQL_BIN" -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -f "$TEST_SQL" 2>&1 | tee -a "$OUTPUT_LOG"

echo -e "\n=============================================================================="
echo "CAPACITY TEST RUN COMPLETED. Evidence logged to: $OUTPUT_LOG"
echo "=============================================================================="
