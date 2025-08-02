// FILE: api/set-prediction.js
// This is the complete, final code for this file.
// Please replace the entire contents of your existing file with this.

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // This block explicitly handles the "preflight" permission check from the browser.
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or 'https://rodrigo.ie'
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type'
    );
    return res.status(200).end();
  }

  // Set headers for the actual POST request
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or 'https://rodrigo.ie'

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
    console.error(error);
    return res.status(500).json({ error: 'Failed to set prediction.' });
  }
}
