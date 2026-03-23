// Cloudflare Pages Function — generates PayTR iframe token
// File path: functions/api/create-payment.js
// This runs FREE on Cloudflare's servers when called. No laptop. No server.
//
// Set your credentials in: Cloudflare Dashboard → Pages → demozi → Settings → Environment variables

export async function onRequestPost({ request, env }) {
    // CORS headers — allow your site to call this function
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.demozi.com',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
        const body = await request.json();
        const { name, email, phone, amount, currency = 'TL', productName, productId } = body;

        // Basic validation
        if (!name || !email || !phone || !amount || !productName) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields: name, email, phone, amount, productName' }),
                { status: 400, headers }
            );
        }

        // PayTR needs amount in kuruş (smallest unit). ₺150.00 → 15000
        const paymentAmount = Math.round(parseFloat(amount) * 100);
        if (isNaN(paymentAmount) || paymentAmount <= 0) {
            return new Response(JSON.stringify({ error: 'Invalid amount' }), { status: 400, headers });
        }

        // Read credentials from Cloudflare environment variables
        const MERCHANT_ID   = env.PAYTR_MERCHANT_ID;
        const MERCHANT_KEY  = env.PAYTR_MERCHANT_KEY;
        const MERCHANT_SALT = env.PAYTR_MERCHANT_SALT;
        const SITE_URL      = 'https://www.demozi.com';

        if (!MERCHANT_ID || !MERCHANT_KEY || !MERCHANT_SALT) {
            return new Response(
                JSON.stringify({ error: 'Payment gateway not configured. Contact support.' }),
                { status: 500, headers }
            );
        }

        // Unique order ID for this transaction
        const merchantOid = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

        // Get user IP
        const userIp = request.headers.get('CF-Connecting-IP')
            || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()
            || '1.2.3.4';

        // Basket: [productName, unitPrice as string, quantity]
        const basketArray = [[productName, String(paymentAmount), 1]];
        const userBasket = btoa(JSON.stringify(basketArray));

        // Build hash string — ORDER MATTERS per PayTR docs
        const hashStr = [
            MERCHANT_ID, userIp, merchantOid, email,
            paymentAmount, userBasket,
            '0',        // no_installment: 0 = allow installments
            '0',        // max_installment: 0 = unlimited
            currency,
            '1',        // test_mode: 1 = test ← change to '0' when going LIVE
            MERCHANT_SALT
        ].join('');

        // HMAC-SHA256 using Web Crypto API (Cloudflare doesn't have Node's crypto)
        const encoder = new TextEncoder();
        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(MERCHANT_KEY),
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );
        const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(hashStr));
        const paytrToken = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));

        // Build form-encoded POST body for PayTR
        const postParams = new URLSearchParams({
            merchant_id:       MERCHANT_ID,
            user_ip:           userIp,
            merchant_oid:      merchantOid,
            email:             email,
            payment_amount:    String(paymentAmount),
            paytr_token:       paytrToken,
            user_basket:       userBasket,
            debug_on:          '1',     // set to '0' when going live
            no_installment:    '0',
            max_installment:   '0',
            user_name:         name,
            user_phone:        phone,
            merchant_ok_url:   `${SITE_URL}/payment-success.html`,
            merchant_fail_url: `${SITE_URL}/payment-fail.html`,
            timeout_limit:     '30',
            currency:          currency,
            test_mode:         '1',     // ← change to '0' when going LIVE
            lang:              'tr',
        });

        // Call PayTR API to get the iframe token
        const paytrResponse = await fetch('https://www.paytr.com/odeme/api/get-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: postParams.toString(),
        });

        const paytrData = await paytrResponse.json();

        if (paytrData.status !== 'success') {
            console.error('[PayTR] Error:', paytrData.reason);
            return new Response(
                JSON.stringify({ error: `PayTR error: ${paytrData.reason || 'Unknown error'}` }),
                { status: 502, headers }
            );
        }

        return new Response(
            JSON.stringify({ iframe_token: paytrData.token, order_id: merchantOid }),
            { status: 200, headers }
        );

    } catch (err) {
        console.error('[PayTR] Unexpected error:', err.message);
        return new Response(
            JSON.stringify({ error: err.message || 'Server error' }),
            { status: 500, headers }
        );
    }
}

// Handle preflight CORS requests from the browser
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': 'https://www.demozi.com',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
