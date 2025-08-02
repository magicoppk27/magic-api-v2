import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Set CORS headers to be absolutely sure they are applied
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle the browser's preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { prediction } = req.body;
    if (!prediction) {
      return res.status(400).json({ error: 'Prediction value is missing.' });
    }
    await kv.set('prediction', prediction);
    return res.status(200).json({ message: `Prediction set to: ${prediction}` });
  } catch (error) {
    console.error("Detailed KV Error:", error);
    return res.status(500).json({ error: 'Failed to set prediction.' });
  }
}
