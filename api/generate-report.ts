// api/generate-report.ts
export default async function handler(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const permitNumbers = searchParams.get('permitNumbers');

    if (!permitNumbers) {
      return new Response('Missing permitNumbers parameter', { status: 400 });
    }

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      return new Response('Server misconfigured: WEBHOOK_URL missing.', { status: 500 });
    }

    const fullUrl = `${webhookUrl}?permitNumbers=${encodeURIComponent(permitNumbers)}`;

    // Trigger webhook asynchronously without waiting for full response
    fetch(fullUrl, { method: 'GET' }).catch(err => console.error('Webhook error:', err));

    // Immediately respond to frontend
    return new Response(JSON.stringify({ message: 'Workflow triggered. Report generation in progress.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error(err);
    return new Response('Internal server error', { status: 500 });
  }
}
