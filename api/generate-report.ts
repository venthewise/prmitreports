// api/generate-report.ts

export default async function handler(request: Request) {
  try {
    // 1. Extract permitNumbers from the query string
    const { searchParams } = new URL(request.url);
    const permitNumbers = searchParams.get('permitNumbers');

    if (!permitNumbers) {
      return new Response('Missing permitNumbers parameter', { status: 400 });
    }

    // 2. Get the secret webhook URL from environment variables
    const targetWebhookUrl = process.env.WEBHOOK_URL;
    if (!targetWebhookUrl) {
      console.error('WEBHOOK_URL environment variable not set.');
      return new Response('Server configuration error.', { status: 500 });
    }

    // 3. Construct the full URL to call the actual webhook
    const fullUrl = `${targetWebhookUrl}?permitNumbers=${encodeURIComponent(permitNumbers)}`;

    // 4. Call the n8n webhook
    const webhookResponse = await fetch(fullUrl);

    if (!webhookResponse.ok) {
      const errText = await webhookResponse.text();
      return new Response(`Webhook request failed: ${errText}`, {
        status: webhookResponse.status,
      });
    }

    // 5. Stream the CSV response back to the client
    return new Response(webhookResponse.body, {
      status: 200,
      headers: {
        'Content-Type': webhookResponse.headers.get('Content-Type') || 'text/csv',
        'Content-Disposition':
          webhookResponse.headers.get('Content-Disposition') || 'attachment; filename="permit_report.csv"',
      },
    });
  } catch (err) {
    console.error('Error in generate-report API:', err);
    return new Response('Internal server error.', { status: 500 });
  }
}
