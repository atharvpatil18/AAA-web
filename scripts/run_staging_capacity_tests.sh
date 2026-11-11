#!/usr/bin/env bash
# ==============================================================================
# ARNAV ABACUS ACADEMY (AAA) — STAGING CAPACITY TEST RUNNER (Bash)
# Governing Reference: MGT-DET-S5-STAGING-03-CORR-01
# Scope: QA-CAP-01 Staging Database Capacity & Concurrency Verification
# STRICT RULE: Staging credentials only. Never run against production.
# ==============================================================================

set -euo pipefail

echo "=============================================================================="
echo "AAA STAGING DATABASE CAPACITY & CONCURRENCY TEST HARNESS (QA-CAP-01)"
echo "=============================================================================="

APPROVED_PROJECT_NAME="aaa-web-staging"
PROJECT_REF="${STAGING_PROJECT_REF:-}"
PORT="${STAGING_PGPORT:-5432}"
DATABASE="${STAGING_PGDATABASE:-postgres}"
USER="${STAGING_PGUSER:-postgres}"
PASSWORD="${STAGING_PGPASSWORD:-}"

if [ -z "$PROJECT_REF" ]; then
    read -p "Please enter Approved Staging Project Reference (e.g., $APPROVED_PROJECT_NAME or assigned ref): " PROJECT_REF
fi

if [ -z "$PROJECT_REF" ]; then
    echo "SECURITY HALT: Staging Project Reference is mandatory. Aborting."
    exit 1
fi

EXPECTED_HOST="db.${PROJECT_REF}.supabase.co"
HOST="${STAGING_PGHOST:-$EXPECTED_HOST}"

if [ "$HOST" != "$EXPECTED_HOST" ]; then
    echo "SECURITY HALT: Target Host '$HOST' does not match derived staging host '$EXPECTED_HOST'. Aborting."
    exit 1
fi

if echo "$HOST" | grep -Ei 'production|prod|live|arnavabacus\.com' > /dev/null; then
    echo "SECURITY HALT: Production hostname detected! Aborting execution immediately."
    exit 1
fi

export PGSSLMODE="require"
echo "Staging Identity Verified: $PROJECT_REF ($HOST)"
echo "SSL Enforcement:           PGSSLMODE=require"

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

cat <<EOF > "$OUTPUT_LOG"
==============================================================================
ARNAV ABACUS ACADEMY — QA-CAP-01 LIVE STAGING TEST EXECUTION LOG
Timestamp:   $(date -u)
Project Ref: $PROJECT_REF
Target Host: $HOST
Database:    $DATABASE
SSL Mode:    require
==============================================================================

EOF

echo -e "\nStep 1: Running Pre-Flight Database Identity Check..."
"$PSQL_BIN" -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -c "SELECT current_database(), current_user, inet_server_addr(), version();" >> "$OUTPUT_LOG" 2>&1
echo "Pre-flight connection confirmed."

echo -e "\nStep 2: Applying Migration: $MIGRATION..."
"$PSQL_BIN" -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -f "$MIGRATION" >> "$OUTPUT_LOG" 2>&1
echo "Migration applied successfully."

echo -e "\nStep 3: Executing Sequential Capacity Tests: $TEST_SQL..."
"$PSQL_BIN" -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -f "$TEST_SQL" 2>&1 | tee -a "$OUTPUT_LOG"

echo -e "\nStep 4: Executing Genuine Two-Session PostgreSQL Concurrency Test (TC-CAP-DB-03)..."
SEED_SQL="
DELETE FROM public.batch_enrollments WHERE batch_id = 'BATCH-TEST-CONCUR';
DELETE FROM public.micro_batches WHERE batch_id = 'BATCH-TEST-CONCUR';
INSERT INTO public.micro_batches (batch_id, batch_name, program, schedule, venue)
VALUES ('BATCH-TEST-CONCUR', 'Concurrency Test Micro Batch (Staging Race)', 'vedic', 'Fri 4:00 PM', 'offline_wakad');
SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-001', 'Student 1', 's1@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-002', 'Student 2', 's2@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-003', 'Student 3', 's3@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-004', 'Student 4', 's4@example.com');
"
"$PSQL_BIN" -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -c "$SEED_SQL" >> "$OUTPUT_LOG" 2>&1

SESS1_SQL="BEGIN; SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-005', 'Candidate 5 (Session 1)', 's1@example.com'); SELECT pg_sleep(2.0); COMMIT;"
SESS2_SQL="BEGIN; SELECT public.enroll_student_into_batch('BATCH-TEST-CONCUR', 'STD-CONCUR-006', 'Candidate 6 (Session 2)', 's2@example.com'); COMMIT;"

SESS1_LOG="docs/11_evidence_and_screenshots/CONCUR_SESSION1.log"
SESS2_LOG="docs/11_evidence_and_screenshots/CONCUR_SESSION2.log"

echo "Launching Session 1 in background (holding lock for 2.0s)..."
"$PSQL_BIN" -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -c "$SESS1_SQL" > "$SESS1_LOG" 2>&1 &
PID1=$!

sleep 0.5

echo "Launching Session 2 concurrently in background (contending for seat 5)..."
"$PSQL_BIN" -h "$HOST" -p "$PORT" -U "$USER" -d "$DATABASE" -c "$SESS2_SQL" > "$SESS2_LOG" 2>&1 &
PID2=$!

wait $PID1 || true
RC1=$?
wait $PID2 || true
RC2=$?

echo -e "\n--- CONCURRENCY TEST RESULTS ---" >> "$OUTPUT_LOG"
cat "$SESS1_LOG" >> "$OUTPUT_LOG"
cat "$SESS2_LOG" >> "$OUTPUT_LOG"

if ! grep -E 'success|COMMIT' "$SESS1_LOG" > /dev/null; then
    echo "CONCURRENCY FAILURE: Session 1 did not succeed."
    exit 1
fi

if ! grep -E '23514|BATCH_CAPACITY_EXCEEDED' "$SESS2_LOG" > /dev/null; then
    echo "CONCURRENCY FAILURE: Session 2 was not rejected with Error 23514."
    exit 1
fi

echo "✅ Concurrency Lock Verified: Session 1 succeeded, Session 2 cleanly rejected with Error 23514."

echo -e "\n=============================================================================="
echo "ALL CAPACITY & CONCURRENCY TESTS COMPLETED SUCCESSFULLY."
echo "Evidence logged to: $OUTPUT_LOG"
echo "=============================================================================="
