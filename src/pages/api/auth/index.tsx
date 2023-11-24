import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import md5 from 'md5';

import User from 'model/user';
import initConn from 'src/lib/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await initConn();

  if (req.method === 'GET' && req.query.slug === 'acceptInvite'){
    return res.json({inviteNum: req.query.invite});
    console.log("Hello, accepting invite", {inviteNum: req.query.invite});
  }

  if (req.method === 'GET' && !req.query.slug ){
    console.log("Hello, endpoint pelon");
  }

  if (req.method === 'POST' ){

    const userEmail = req.body.email;

    // Temporarly using md5 for legacy compatibility
    const userPassword = md5(req.body.password);
    // console.log("MD5 hashed password", userPassword);

    const myUser = await User.findOne({ email: userEmail, password: userPassword, status: 'active' }, '-password').lean();
    if(myUser){

      console.info("Welcome mr user", myUser);

      const token = jwt.sign({ user: myUser }, process.env.SECRET, {
        expiresIn: '12h',
      });

      return res.json({success: true, jwt: token});
    }
    return res.status(401).json({success: false, error: "Authentication error"});
  }

}
