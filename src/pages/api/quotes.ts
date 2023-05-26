import { processFetchRequest } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (!req.query?.genre) {
        res.status(400).json({})
    }

    const QUOTES_URL = `https://quoted-journey-api.vercel.app/quotes?genre=${req.query?.genre}`;
    const response = await processFetchRequest(QUOTES_URL);

    res.status(200).json(response);
}
