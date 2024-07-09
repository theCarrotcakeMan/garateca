import type { NextApiRequest, NextApiResponse } from 'next';

import User from '/model/user';
import initConn from '/src/lib/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await initConn();
  console.log("Pre connection aborted", req.query);

  if (req.method === 'GET' && req.query.slug === 'acceptInvite'){
    return res.json({inviteNum: req.query.invite});
    console.log("Hello, accepting invite", {inviteNum: req.query.invite});
  }

}
