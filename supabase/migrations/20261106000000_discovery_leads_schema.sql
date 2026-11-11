-- ==============================================================================
-- ARNAV ABACUS ACADEMY (AAA) — DATABASE MIGRATION SCRIPT
-- Migration Reference: 20261106000000_discovery_leads_schema.sql
-- Target Workstream: WS-16 Admissions Intake Gateway (QA-WS-16 / QA-INT-02)
-- Governing Determination: MGT-DET-S4-S3-PLAN-01, MGT-DET-S5-REV-1.2.0-ACPT
-- Governing Architecture: AAA-WS16-CAP01-Database-and-Identity-Design
--
-- Objectives:
-- 1. Ensure pgcrypto extension is active for gen_random_uuid().
-- 2. Create annual atomic sequence `public.lead_ref_seq_2026` for human-readable references.
-- 3. Create authoritative admissions table `public.leads` with DPDP consent fields and RLS.
-- 4. Deploy atomic transactional RPC `public.fn_submit_discovery_lead(...)` with 24h idempotency.
-- 5. Enforce Row Level Security (RLS) and grant execute to service_role and anon as appropriate.
-- ==============================================================================

-- 1. Cryptographic Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Annual Atomic Sequence for Lead References (AAA-LEAD-2026-00001)
CREATE SEQUENCE IF NOT EXISTS public.lead_ref_seq_2026
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999
    CACHE 1;

-- 3. Core Admissions Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    -- Tier 1: System Immutable Primary Key
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Tier 2: Human-Readable Authoritative Lead Reference (e.g., AAA-LEAD-2026-00001)
    lead_reference VARCHAR(24) NOT NULL,
    
    -- Tier 3: Client Idempotency Key (24-hour duplicate submission protection)
    idempotency_key UUID NOT NULL,
    
    -- Ingress Metadata & Zero-PII Audit Hashes
    source_channel VARCHAR(32) NOT NULL DEFAULT 'WEB_DISCOVERY',
    client_ip_hash VARCHAR(64) NOT NULL,
    user_agent_hash VARCHAR(64),
    
    -- Parent & Student Inquiry Attributes (Verbatim)
    parent_name VARCHAR(120) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    email VARCHAR(120),
    child_age_bracket VARCHAR(20) NOT NULL,
    course_interest VARCHAR(40) NOT NULL,
    notes TEXT,
    
    -- DPDP Act 2023 Statutory Consent & Guardian Authority
    consent_service_version VARCHAR(24) NOT NULL DEFAULT 'CONSENT_SERVICE_V1',
    consent_service_granted_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('Asia/Kolkata', NOW()),
    consent_marketing_version VARCHAR(24),
    consent_marketing_granted_at TIMESTAMPTZ,
    guardian_authority_type VARCHAR(40) NOT NULL DEFAULT 'GUARDIAN_AUTHORITY_SELF_DECLARATION_V1',
    
    -- Admissions Lifecycle State Machine
    lifecycle_status VARCHAR(40) NOT NULL DEFAULT 'ENQUIRY_RECEIVED',
    
    -- Record Timestamps & 90-Day Prospect Retention Purge Clock
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('Asia/Kolkata', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('Asia/Kolkata', NOW()),
    retention_purge_due_at TIMESTAMPTZ NOT NULL DEFAULT (TIMEZONE('Asia/Kolkata', NOW()) + INTERVAL '90 days'),
    
    -- Hard Constraints
    CONSTRAINT uq_leads_lead_reference UNIQUE (lead_reference),
    CONSTRAINT uq_leads_idempotency_key UNIQUE (idempotency_key)
);

-- Indexing for rapid staff lookups, deduplication, and retention audits
CREATE INDEX IF NOT EXISTS idx_leads_mobile_created ON public.leads (mobile_number, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_idempotency ON public.leads (idempotency_key);
CREATE INDEX IF NOT EXISTS idx_leads_retention_purge ON public.leads (retention_purge_due_at) WHERE lifecycle_status = 'ENQUIRY_RECEIVED';

-- 4. Atomic Sequence Allocation & Ingestion Stored Procedure (ACID Engine)
CREATE OR REPLACE FUNCTION public.fn_submit_discovery_lead(
    p_idempotency_key UUID,
    p_parent_name VARCHAR,
    p_mobile_number VARCHAR,
    p_email VARCHAR,
    p_child_age_bracket VARCHAR,
    p_course_interest VARCHAR,
    p_service_consent BOOLEAN,
    p_marketing_consent BOOLEAN,
    p_guardian_confirmed BOOLEAN,
    p_client_ip_hash VARCHAR
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_existing_lead RECORD;
    v_next_seq BIGINT;
    v_current_year VARCHAR(4);
    v_new_lead_ref VARCHAR(24);
    v_new_id UUID;
    v_created_at TIMESTAMPTZ;
BEGIN
    -- 1. Idempotency Check (24-Hour Re-submission Window)
    SELECT id, lead_reference, created_at
    INTO v_existing_lead
    FROM public.leads
    WHERE idempotency_key = p_idempotency_key;
    
    IF FOUND THEN
        -- Return existing lead record without creating duplicate or advancing sequence
        RETURN jsonb_build_object(
            'success', true,
            'isDuplicate', true,
            'id', v_existing_lead.id,
            'leadReference', v_existing_lead.lead_reference,
            'createdAt', v_existing_lead.created_at,
            'message', 'Duplicate submission detected. Existing inquiry retained.'
        );
    END IF;

    -- 2. Validate Mandatory Statutory Conditions (DPDP Act 2023)
    IF NOT p_guardian_confirmed THEN
        RAISE EXCEPTION 'Guardian Authority Self-Declaration is mandatory under Section 9 DPDP Act 2023.';
    END IF;

    IF NOT p_service_consent THEN
        RAISE EXCEPTION 'Service communication consent is required to coordinate diagnostic assessment.';
    END IF;

    -- 3. Atomic Sequence Allocation
    v_current_year := TO_CHAR(TIMEZONE('Asia/Kolkata', NOW()), 'YYYY');
    v_next_seq := NEXTVAL('public.lead_ref_seq_2026');
    v_new_lead_ref := 'AAA-LEAD-' || v_current_year || '-' || LPAD(v_next_seq::TEXT, 5, '0');
    v_created_at := TIMEZONE('Asia/Kolkata', NOW());

    -- 4. Insert Authoritative Lead Record
    INSERT INTO public.leads (
        idempotency_key,
        lead_reference,
        parent_name,
        mobile_number,
        email,
        child_age_bracket,
        course_interest,
        consent_service_version,
        consent_service_granted_at,
        consent_marketing_version,
        consent_marketing_granted_at,
        guardian_authority_type,
        client_ip_hash,
        created_at,
        updated_at
    ) VALUES (
        p_idempotency_key,
        v_new_lead_ref,
        p_parent_name,
        p_mobile_number,
        p_email,
        p_child_age_bracket,
        p_course_interest,
        'CONSENT_SERVICE_V1',
        v_created_at,
        CASE WHEN p_marketing_consent THEN 'CONSENT_MARKETING_V1' ELSE NULL END,
        CASE WHEN p_marketing_consent THEN v_created_at ELSE NULL END,
        'GUARDIAN_AUTHORITY_SELF_DECLARATION_V1',
        p_client_ip_hash,
        v_created_at,
        v_created_at
    )
    RETURNING id INTO v_new_id;

    -- 5. Return Successful Persistence Payload
    RETURN jsonb_build_object(
        'success', true,
        'isDuplicate', false,
        'id', v_new_id,
        'leadReference', v_new_lead_ref,
        'createdAt', v_created_at,
        'message', 'Discovery session inquiry registered and permanently persisted.'
    );
END;
$$;

-- 5. Security, Row Level Security (RLS) & Permissions
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anonymous public internet users have ZERO direct table read or write access
REVOKE ALL ON public.leads FROM anon;
REVOKE ALL ON public.leads FROM authenticated;

-- Service role (used by Cloudflare Pages Function) has full table access
GRANT ALL ON public.leads TO service_role;

-- Grant execute permissions on the RPC stored procedure
GRANT EXECUTE ON FUNCTION public.fn_submit_discovery_lead TO service_role;
GRANT EXECUTE ON FUNCTION public.fn_submit_discovery_lead TO anon;
GRANT USAGE, SELECT ON SEQUENCE public.lead_ref_seq_2026 TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.lead_ref_seq_2026 TO anon;
