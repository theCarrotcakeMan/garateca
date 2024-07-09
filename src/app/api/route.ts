import type { NextApiResponse } from 'next';

export async function GET(res: NextApiResponse) {
  return res.json("These are not the droids you're looking for...");
}
