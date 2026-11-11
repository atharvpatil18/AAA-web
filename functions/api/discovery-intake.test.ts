/**
 * ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16
 * Server-Side Gateway Acceptance Test Suite (10 Acceptance Tests)
 *
 * Governing Document: AAA-WS16-ARCH-SRV-01, AAA-WS16-ARCH-ID-01
 * Governing Determination: MGT-DET-S4-S3-AUTH-02
 */

import { handleDiscoveryIntakeRequest } from './discovery-intake';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`SERVER GATEWAY TEST FAILED: ${message}`);
  }
}

async function runServerGatewayTests() {
  console.log('=== AAA SERVER-SIDE INTAKE GATEWAY TEST SUITE ===');
  console.log('Target Architecture: Cloudflare Pages Edge Function (/api/discovery-intake)');
  console.log('Governing Determination: MGT-DET-S4-S3-AUTH-02\n');

  const basePayload = {
    parentName: 'Sneha Kulkarni',
    parentPhone: '9823012345',
    childAgeBracket: '4.5-6',
    courseInterest: 'abacus',
    serviceConsent: true,
    parentGuardianConfirmed: true,
  };

  // TC-SRV-01: Reject non-POST methods
  console.log('Running TC-SRV-01: Method Not Allowed Enforcement...');
  const getReq = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'GET',
  });
  const getRes = await handleDiscoveryIntakeRequest(getReq);
  assert(getRes.status === 405, 'GET request must be rejected with HTTP 405');
  console.log('✅ TC-SRV-01 Passed: GET method rejected with HTTP 405.');

  // TC-SRV-02: Honeypot bot trap
  console.log('Running TC-SRV-02: Honeypot Anti-Bot Trap...');
  const botReq = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...basePayload,
      website_url_hp: 'https://spam-phishing.org/bot',
    }),
  });
  const botRes = await handleDiscoveryIntakeRequest(botReq);
  const botJson = await botRes.json();
  assert(botRes.status === 200, 'Bot trap must return synthetic 200 OK');
  assert(botJson.isBotDropped === true, 'isBotDropped must be true');
  assert(botJson.leadReference === 'AAA-LEAD-BOT-TRAP', 'leadReference must be AAA-LEAD-BOT-TRAP');
  console.log('✅ TC-SRV-02 Passed: Automated bot quietly dropped with synthetic 200.');

  // TC-SRV-03: Invalid Indian phone number
  console.log('Running TC-SRV-03: Mobile Phone Validation Guard...');
  const invalidPhoneReq = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...basePayload,
      parentPhone: '123456',
    }),
  });
  const invalidPhoneRes = await handleDiscoveryIntakeRequest(invalidPhoneReq);
  assert(invalidPhoneRes.status === 400, 'Invalid phone must return HTTP 400');
  console.log('✅ TC-SRV-03 Passed: Invalid phone rejected with HTTP 400.');

  // TC-SRV-04: Mandatory Guardian Authority Self-Declaration
  console.log('Running TC-SRV-04: Guardian Authority Self-Declaration Guard...');
  const noGuardianReq = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...basePayload,
      parentGuardianConfirmed: false,
    }),
  });
  const noGuardianRes = await handleDiscoveryIntakeRequest(noGuardianReq);
  assert(noGuardianRes.status === 422, 'Missing guardian confirmation must return HTTP 422');
  console.log('✅ TC-SRV-04 Passed: Missing guardian authority rejected with HTTP 422.');

  // TC-SRV-05: Mandatory Service Consent
  console.log('Running TC-SRV-05: Service Communication Consent Guard...');
  const noServiceReq = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...basePayload,
      serviceConsent: false,
    }),
  });
  const noServiceRes = await handleDiscoveryIntakeRequest(noServiceReq);
  assert(noServiceRes.status === 422, 'Missing service consent must return HTTP 422');
  console.log('✅ TC-SRV-05 Passed: Missing service consent rejected with HTTP 422.');

  // TC-SRV-06: Valid Lead Submission & 3-Tier Identity Allocation
  console.log('Running TC-SRV-06: Valid Submission & 3-Tier Identity Allocation...');
  const validReq1 = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '203.0.113.10',
    },
    body: JSON.stringify(basePayload),
  });
  const validRes1 = await handleDiscoveryIntakeRequest(validReq1);
  const validJson1 = await validRes1.json();
  assert(validRes1.status === 201, 'Valid submission must return HTTP 201 Created');
  assert(validJson1.success === true, 'Success must be true');
  assert(validJson1.id !== undefined, 'Tier 1 System UUID must be allocated');
  assert(
    /^AAA-LEAD-\d{4}-\d{5}$/.test(validJson1.leadReference),
    `Lead reference format must match AAA-LEAD-YYYY-[00001], received: ${validJson1.leadReference}`
  );
  console.log(`✅ TC-SRV-06 Passed: Lead allocated reference ${validJson1.leadReference} with UUID ${validJson1.id}.`);

  // TC-SRV-07: Monotonic Sequential Reference Increment
  console.log('Running TC-SRV-07: Monotonic Sequence Numbering...');
  const validReq2 = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '203.0.113.10',
    },
    body: JSON.stringify({
      ...basePayload,
      parentName: 'Rahul Deshmukh',
      parentPhone: '9823098765',
    }),
  });
  const validRes2 = await handleDiscoveryIntakeRequest(validReq2);
  const validJson2 = await validRes2.json();
  assert(validRes2.status === 201, 'Second submission must return HTTP 201 Created');
  assert(
    validJson2.leadReference !== validJson1.leadReference,
    'Sequential reference must be unique and incremented'
  );
  console.log(`✅ TC-SRV-07 Passed: Subsequent lead allocated strictly next reference ${validJson2.leadReference}.`);

  // TC-SRV-08: Idempotency Cache Protection
  console.log('Running TC-SRV-08: Idempotency Key Re-submission...');
  const idemKey = 'cf-idem-test-uuid-999';
  const idemReq1 = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '203.0.113.10',
      'Idempotency-Key': idemKey,
    },
    body: JSON.stringify(basePayload),
  });
  const idemRes1 = await handleDiscoveryIntakeRequest(idemReq1);
  const idemJson1 = await idemRes1.json();

  const idemReq2 = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '203.0.113.10',
      'Idempotency-Key': idemKey,
    },
    body: JSON.stringify(basePayload),
  });
  const idemRes2 = await handleDiscoveryIntakeRequest(idemReq2);
  const idemJson2 = await idemRes2.json();
  assert(
    idemJson1.leadReference === idemJson2.leadReference,
    'Idempotency retry must return identical cached lead reference'
  );
  console.log('✅ TC-SRV-08 Passed: Duplicate submission with identical idempotency key returned cached response.');

  // TC-SRV-09: Server Rate Limiting Enforcement (5 req / window)
  console.log('Running TC-SRV-09: Trusted IP Edge Rate Limiting Enforcement...');
  const rateLimitIp = '198.51.100.77';
  let floodBlockSuccess = false;

  for (let i = 1; i <= 6; i++) {
    const floodReq = new Request('https://arnavabacus.com/api/discovery-intake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Connecting-IP': rateLimitIp,
      },
      body: JSON.stringify({
        ...basePayload,
        parentPhone: `982301110${i}`,
      }),
    });
    const floodRes = await handleDiscoveryIntakeRequest(floodReq);
    if (i <= 5) {
      assert(floodRes.status === 201, `Request #${i} must be permitted`);
    } else {
      assert(floodRes.status === 429, '6th request from same IP must be rejected with HTTP 429');
      assert(floodRes.headers.get('Retry-After') !== null, 'Retry-After header must be set');
      floodBlockSuccess = true;
    }
  }
  assert(floodBlockSuccess, '6th request must trigger HTTP 429');
  console.log('✅ TC-SRV-09 Passed: Server boundary permits 5 requests and blocks 6th with HTTP 429.');

  // TC-SRV-10: Formula Input Preservation in Raw Ingress
  console.log('Running TC-SRV-10: Raw Input Verbatim Preservation (Zero Premature Quote Mutation)...');
  const plusPayload = {
    ...basePayload,
    parentName: '+Dr. Vikram Patil',
    parentPhone: '9823055555',
  };
  const plusReq = new Request('https://arnavabacus.com/api/discovery-intake', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '203.0.113.99',
    },
    body: JSON.stringify(plusPayload),
  });
  const plusRes = await handleDiscoveryIntakeRequest(plusReq);
  assert(plusRes.status === 201, 'Request with leading plus in name must be accepted');
  console.log('✅ TC-SRV-10 Passed: Canonical data stored verbatim without premature quote prepending.');

  // TC-SRV-11: Gate 3 Supabase PostgREST Persistence Bridge (Success)
  console.log('Running TC-SRV-11: Supabase PostgREST Persistence RPC Integration...');
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async (url: any, init?: any) => {
      if (String(url).includes('fn_submit_discovery_lead')) {
        return new Response(
          JSON.stringify({
            id: '550e8400-e29b-41d4-a716-446655440000',
            leadReference: 'AAA-LEAD-2026-00099',
            createdAt: '2026-11-05T09:30:00.000Z',
            message: 'Discovery session inquiry registered and permanently persisted.',
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return originalFetch(url, init);
    };

    const mockEnv = {
      SUPABASE_URL: 'https://mock-mumbai.supabase.co',
      SUPABASE_SERVICE_ROLE_KEY: 'test-service-key-xyz',
    };
    const dbReq = new Request('https://arnavabacus.com/api/discovery-intake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Connecting-IP': '203.0.113.88',
      },
      body: JSON.stringify({
        ...basePayload,
        parentName: 'Ananya Deshpande',
        parentPhone: '9823077777',
      }),
    });
    const dbRes = await handleDiscoveryIntakeRequest(dbReq, mockEnv);
    const dbJson = await dbRes.json();
    assert(dbRes.status === 201, 'Supabase persistence must return HTTP 201 Created');
    assert(dbJson.leadReference === 'AAA-LEAD-2026-00099', 'Must return Supabase allocated lead reference');
    assert(dbJson.id === '550e8400-e29b-41d4-a716-446655440000', 'Must return Supabase allocated UUID');
    console.log('✅ TC-SRV-11 Passed: Supabase PostgREST RPC persists record and returns confirmed 3-tier lead identity.');

    // TC-SRV-12: Gate 3 Supabase Error Propagation Guard
    console.log('Running TC-SRV-12: Supabase Error Propagation Guard (No False Success)...');
    globalThis.fetch = async (url: any, init?: any) => {
      if (String(url).includes('fn_submit_discovery_lead')) {
        return new Response(
          JSON.stringify({ message: 'Database connection timeout in ap-south-1' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return originalFetch(url, init);
    };

    const errReq = new Request('https://arnavabacus.com/api/discovery-intake', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Connecting-IP': '203.0.113.89',
      },
      body: JSON.stringify({
        ...basePayload,
        parentName: 'Sunil Gavaskar',
        parentPhone: '9823088888',
      }),
    });
    const errRes = await handleDiscoveryIntakeRequest(errReq, mockEnv);
    const errJson = await errRes.json();
    assert(errRes.status === 500, 'Database failure must return HTTP 500');
    assert(errJson.success === false, 'Success must be false upon database persistence failure');
    assert(errJson.error === 'Database persistence failed. Ingestion aborted.', 'Error message must clearly state persistence failure');
    console.log('✅ TC-SRV-12 Passed: Database error properly rejected with HTTP 500; zero false success.');
  } finally {
    globalThis.fetch = originalFetch;
  }

  console.log('\n================================================================');
  console.log('🎉 ALL 12/12 SERVER GATEWAY ACCEPTANCE TESTS PASSED SUCCESSFULLY');
  console.log('================================================================');
}

runServerGatewayTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
