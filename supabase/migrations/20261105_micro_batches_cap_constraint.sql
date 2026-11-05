-- ==============================================================================
-- ARNAV ABACUS ACADEMY (AAA) — DATABASE MIGRATION SCRIPT
-- Migration Reference: 20261105_micro_batches_cap_constraint.sql
-- Target Workstream: WS-18 Hardening (QA-CAP-01)
-- Governing Determination: MGT-DET-S5-RECON-02
--
-- Objective:
-- 1. Create micro_batches table with explicit capacity cap constraint (<= 5).
-- 2. Create batch_enrollments table tracking student-to-batch mapping.
-- 3. Deploy atomic transactional RPC `enroll_student_into_batch` with row-level
--    locking (SELECT FOR UPDATE) to guarantee zero concurrency race oversubscription.
-- ==============================================================================

-- 1. Micro-Batches Table
CREATE TABLE IF NOT EXISTS public.micro_batches (
    batch_id VARCHAR(64) PRIMARY KEY,
    batch_name VARCHAR(128) NOT NULL,
    program VARCHAR(32) NOT NULL CHECK (program IN ('abacus', 'vedic', 'mental', 'school_math', 'olympiad')),
    schedule VARCHAR(128) NOT NULL,
    venue VARCHAR(64) NOT NULL DEFAULT 'offline_wakad',
    enrolled_count INT NOT NULL DEFAULT 0,
    is_full BOOLEAN GENERATED ALWAYS AS (enrolled_count >= 5) STORED,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    -- MANDATORY CONTRACTUAL CAP: Strictly maximum 5 students per batch
    CONSTRAINT chk_max_batch_capacity CHECK (enrolled_count >= 0 AND enrolled_count <= 5)
);

-- 2. Student Batch Enrollments Table
CREATE TABLE IF NOT EXISTS public.batch_enrollments (
    enrollment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id VARCHAR(64) NOT NULL REFERENCES public.micro_batches(batch_id) ON DELETE RESTRICT,
    student_uid VARCHAR(32) NOT NULL,
    student_name VARCHAR(128) NOT NULL,
    parent_email VARCHAR(255) NOT NULL,
    lead_reference VARCHAR(64),
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    -- Ensure a student cannot be enrolled twice in the same batch
    CONSTRAINT uq_batch_student UNIQUE (batch_id, student_uid)
);

-- Indexing for fast batch lookups
CREATE INDEX IF NOT EXISTS idx_batch_enrollments_batch_id ON public.batch_enrollments(batch_id);
CREATE INDEX IF NOT EXISTS idx_batch_enrollments_student_uid ON public.batch_enrollments(student_uid);
CREATE INDEX IF NOT EXISTS idx_batch_enrollments_parent_email ON public.batch_enrollments(parent_email);

-- 3. Transactional Stored Procedure: enroll_student_into_batch
-- Enforces row-level lock on the targeted batch row, preventing concurrency races.
CREATE OR REPLACE FUNCTION public.enroll_student_into_batch(
    p_batch_id VARCHAR(64),
    p_student_uid VARCHAR(32),
    p_student_name VARCHAR(128),
    p_parent_email VARCHAR(255),
    p_lead_ref VARCHAR(64) DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_current_count INT;
    v_batch_name VARCHAR(128);
    v_enrollment_id UUID;
    v_updated_count INT;
BEGIN
    -- 1. Acquire exclusive row-level lock on the target batch
    SELECT enrolled_count, batch_name 
    INTO v_current_count, v_batch_name
    FROM public.micro_batches
    WHERE batch_id = p_batch_id
    FOR UPDATE;

    -- Batch existence check
    IF NOT FOUND THEN
        RAISE EXCEPTION 'BATCH_NOT_FOUND: Batch % does not exist.', p_batch_id
            USING ERRCODE = 'P0002';
    END IF;

    -- 2. Evaluate hard micro-batch capacity guard
    IF v_current_count >= 5 THEN
        RAISE EXCEPTION 'BATCH_CAPACITY_EXCEEDED: Batch "%" has reached its maximum contractual limit of 5 students (current: %).', v_batch_name, v_current_count
            USING ERRCODE = '23514'; -- check_violation
    END IF;

    -- 3. Insert student enrollment record
    INSERT INTO public.batch_enrollments (
        batch_id,
        student_uid,
        student_name,
        parent_email,
        lead_reference
    ) VALUES (
        p_batch_id,
        p_student_uid,
        p_student_name,
        lower(trim(p_parent_email)),
        p_lead_ref
    )
    RETURNING enrollment_id INTO v_enrollment_id;

    -- 4. Atomically increment batch enrollment counter
    UPDATE public.micro_batches
    SET 
        enrolled_count = enrolled_count + 1,
        updated_at = timezone('utc'::text, now())
    WHERE batch_id = p_batch_id
    RETURNING enrolled_count INTO v_updated_count;

    -- 5. Return success payload
    RETURN jsonb_build_object(
        'success', true,
        'enrollment_id', v_enrollment_id,
        'batch_id', p_batch_id,
        'batch_name', v_batch_name,
        'student_uid', p_student_uid,
        'student_name', p_student_name,
        'new_enrolled_count', v_updated_count,
        'is_full', (v_updated_count >= 5),
        'message', format('Successfully enrolled %s into %s (%s/5).', p_student_name, v_batch_name, v_updated_count)
    );

EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'STUDENT_ALREADY_ENROLLED: Student % is already enrolled in batch %.', p_student_uid, p_batch_id
            USING ERRCODE = '23505';
    WHEN check_violation THEN
        RAISE EXCEPTION 'BATCH_CAPACITY_EXCEEDED: Hard database constraint chk_max_batch_capacity prevented overflow beyond 5 students.'
            USING ERRCODE = '23514';
END;
$$;
