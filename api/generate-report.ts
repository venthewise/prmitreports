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
      return new Response('Server misconfigured: WEBHOOK_URL missing.', { status: 500 });
    }

    const fullUrl = `${webhookUrl}?permitNumbers=${encodeURIComponent(permitNumbers)}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      const text = await response.text();
      return new Response(`Webhook failed: ${text}`, { status: response.status });
    }

    // Stream CSV back to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'text/csv',
        'Content-Disposition': response.headers.get('Content-Disposition') || 'attachment; filename="permit_report.csv"',
      },
    });
  } catch (err) {
    console.error(err);
    return new Response('Internal server error', { status: 500 });
  }
}
