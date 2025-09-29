// api/generate-report.ts

// This is a Vercel Serverless Function that runs on the Edge for performance.
// It will be deployed at the endpoint /api/generate-report
//export const config = {
//  runtime: 'edge',
//};

export default async function handler(request: Request) {
  // 1. Get the 'permitNumbers' from the incoming request's URL query string.
  const { searchParams } = new URL(request.url);
  const permitNumbers = searchParams.get('permitNumbers');

  if (!permitNumbers) {
    return new Response('Missing permitNumbers parameter', { status: 400 });
  }

  // 2. Get the secret webhook URL from the environment variables.
  // IMPORTANT: This MUST be set in the Vercel project settings.
  const targetWebhookUrl = process.env.WEBHOOK_URL;

  if (!targetWebhookUrl) {
    console.error('WEBHOOK_URL environment variable not set.');
    return new Response('Server configuration error.', { status: 500 });
  }

  // 3. Construct the full URL to call the actual webhook.
  const fullUrl = `${targetWebhookUrl}?permitNumbers=${encodeURIComponent(permitNumbers)}`;

  try {
    // 4. Fetch the data from the secret webhook.
    const response = await fetch(fullUrl);

    // 5. If the webhook call fails, pass its error message back to the client.
    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`Webhook request failed: ${errorText}`, {
        status: response.status,
      });
    }
    
    // 6. Stream the response (the CSV file) from the webhook directly back to the client.
    // This is efficient as it doesn't wait for the whole file to be downloaded on the server first.
    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'text/csv',
        'Content-Disposition': response.headers.get('Content-Disposition') || 'attachment; filename="permit_report.csv"',
      },
    });

  } catch (error) {
    console.error('Error fetching from webhook:', error);
    return new Response('An internal server error occurred.', { status: 500 });
  }
}
