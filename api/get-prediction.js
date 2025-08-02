import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Set CORS headers to be absolutely sure they are applied
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const prediction = await kv.get('prediction');
    const currentPrediction = prediction || "[No prediction set]";
    return res.status(200).json({ prediction: currentPrediction });
  } catch (error) {
    console.error("Detailed KV Error:", error);
    return res.status(500).json({ error: 'Failed to get prediction.' });
  }
}

