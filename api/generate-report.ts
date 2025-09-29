// api/generate-report.ts
export default async function handler(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const permitNumbers = searchParams.get('permitNumbers');

    if (!permitNumbers) {
      return new Response('Missing permitNumbers parameter', { status: 400 });
    }

    // Get webhook URL from Vercel environment variable
    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('WEBHOOK_URL not set in environment variables.');
      return new Response('Server misconfigured: WEBHOOK_URL missing.', { status: 500 });
    }

    // Call n8n webhook
    const fullUrl = `${webhookUrl}?permitNumbers=${encodeURIComponent(permitNumbers)}`;
    const response = await fetch(fullUrl, { method: 'GET' });

    if (!response.ok) {
      const text = await response.text();
      return new Response(`Webhook failed: ${text}`, { status: response.status });
    }

    // Workflow accepted — return success
    return new Response(JSON.stringify({ message: 'Workflow submitted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('Error in generate-report:', err);
    return new Response('Internal server error', { status: 500 });
  }
}
