import type { NextApiRequest, NextApiResponse } from 'next';

import User from '/model/user';
import initConn from '/src/lib/db';

// import { reduceUser } from 'src/lib/reductors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await initConn();

  if (req.method === 'GET') {

    const users = await User.aggregate( [
                                          {
                                            //Only get active users
                                            '$match': {
                                              'status': 'active'
                                            }
                                          }, {
                                            '$unwind': {
                                              'path':   '$branchId'
                                            }
                                          }, {
                                            //Lookup branch details
                                            '$lookup': {
                                              'from':         'branches',
                                              'localField':   'branchId',
                                              'foreignField': 'legacyId',
                                              'as':           'branch'
                                            }
                                          }, {
                                            '$unwind': {
                                              'path':   '$branch'
                                            }
                                          }, {
                                            //Makes sure we only get the fields we are supposed to display
                                            '$project': {
                                              'username':   '$username',
                                              'firstName':  '$firstName',
                                              'lastName':   '$lastName',
                                              'role':       '$role',
                                              'email':      '$email',
                                              'branchName': '$branch.name'
                                            }
                                          }
                                        ])
                                        .exec();
    return res.json(users);

  } else if(req.method === 'POST') {

    const myUser = await User.replaceOne(
                       { email: req.body?.email },
                       req.body,
                       { upsert: true }
                    );
    return res.json( { success: true, message: "User created successfully", result: myUser } );

  }

}
