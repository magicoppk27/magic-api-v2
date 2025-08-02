import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // This block ensures GET requests also have the correct permissions
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // This line READS the prediction
    const prediction = await kv.get('prediction');
    const currentPrediction = prediction || "[No prediction set]";
    return res.status(200).json({ prediction: currentPrediction });
  } catch (error) {
    // --- NEW --- This will log the detailed error to Vercel
    console.error("Detailed KV Error:", error);
    return res.status(500).json({ error: 'Failed to get prediction.' });
  }
}
