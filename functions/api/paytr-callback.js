// Cloudflare Pages Function — handles PayTR payment callback
// File path: functions/api/paytr-callback.js
// PayTR calls this URL after every payment to confirm success/fail
// MUST respond with exactly "OK"

export async function onRequestPost({ request, env }) {
    try {
        const MERCHANT_KEY  = env.PAYTR_MERCHANT_KEY;
        const MERCHANT_SALT = env.PAYTR_MERCHANT_SALT;

        const body = await request.text();
        const params = new URLSearchParams(body);

        const merchant_oid    = params.get('merchant_oid');
        const status          = params.get('status');
        const total_amount    = params.get('total_amount');
        const receivedHash    = params.get('hash');
        const failedReasonMsg = params.get('failed_reason_msg') || '';

        // Verify the hash — confirms request really came from PayTR
        const hashStr = `${merchant_oid}${MERCHANT_SALT}${status}${total_amount}`;
        const encoder = new TextEncoder();

        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(MERCHANT_KEY),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );
        const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(hashStr));
        const expectedHash = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

        if (expectedHash !== receivedHash) {
            console.error('[PayTR Callback] Hash mismatch! Suspicious request.');
            return new Response('HASH_MISMATCH', { status: 200 });
        }

        if (status === 'success') {
            console.log(`✅ Payment SUCCESS — Order: ${merchant_oid}, Amount: ${total_amount}`);
        } else {
            console.log(`❌ Payment FAILED  — Order: ${merchant_oid}, Reason: ${failedReasonMsg}`);
        }

        // PayTR REQUIRES exactly "OK" as the response — do not change this
        return new Response('OK', { status: 200 });

    } catch (err) {
        console.error('[PayTR Callback] Error:', err.message);
        return new Response('OK', { status: 200 }); // always OK to PayTR
    }
}
