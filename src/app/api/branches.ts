import type { NextApiRequest, NextApiResponse } from 'next';

import initConn from '/src/lib/db';
import Branch from '/model/branch';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {

  await initConn();

  const branches = await Branch
                            .find({ status: "active" })
                            .lean();

  return res.json(branches);

}
