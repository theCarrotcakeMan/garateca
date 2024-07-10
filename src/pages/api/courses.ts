import type { NextApiRequest, NextApiResponse } from 'next';

import Course from '/model/course';
import Lesson from '/model/lesson';
import initConn from '/src/lib/db';

import { useToken } from 'src/lib/auth';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await initConn();

  if (req.method === 'GET') {

    // console.debug("Les va a quitar el regocijo", req);
    // if(! req.headers['Authentication'] /* && validateToken(req.headers['Authentication']) */ ){
    //
    //   return res.json({ success:false, error: "I love my women" });
    // }

    const courses = await Course.aggregate([
                                            {
                                              '$match': {
                                                'status': 'active'
                                              }
                                            }, {
                                              '$lookup': {
                                                'from': 'categories',
                                                'localField': 'category',
                                                'foreignField': 'slug',
                                                'as': 'categoryLookup'
                                              }
                                            }, {
                                              '$unwind': {
                                                'path': '$categoryLookup'
                                              }
                                            }, {
                                              '$group': {
                                                '_id': '$category',
                                                'items': {
                                                  '$push': '$$ROOT'
                                                },
                                                'mediaUrl': {
                                                  '$first': '$mediaUrl'
                                                },
                                                'categoryLabel': {
                                                  '$first': '$categoryLookup.label'
                                                },
                                                'categoryOrder': {
                                                  '$first': '$categoryLookup.order'
                                                },
                                                'label': {
                                                  '$min': {
                                                    '$concat': [
                                                      {
                                                        '$toUpper': {
                                                          '$substrCP': [
                                                            '$category', 0, 1
                                                          ]
                                                        }
                                                      }, {
                                                        '$replaceAll': {
                                                          'input': {
                                                            '$substrCP': [
                                                              '$category', 1, {
                                                                '$subtract': [
                                                                  {
                                                                    '$strLenCP': '$category'
                                                                  }, 1
                                                                ]
                                                              }
                                                            ]
                                                          },
                                                          'find': '-',
                                                          'replacement': ' '
                                                        }
                                                      }
                                                    ]
                                                  }
                                                }
                                              }
                                            }, {
                                              '$sort': {
                                                'categoryOrder': 1
                                              }
                                            }
                                          ])
                                          .exec();

    return res.json(courses);

  } else if(req.method === 'POST') {

    console.log("POST", req);
  }

}
