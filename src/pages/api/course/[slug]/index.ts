import type { NextApiRequest, NextApiResponse } from 'next';

import Course from 'model/course';
import initConn from 'src/lib/db';

// import { reduceUser } from 'src/lib/reductors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await initConn();

  if (req.method === 'GET') {

    const courseDetail = await Course.aggregate([
                                                  {
                                                    '$match': {
                                                      'status': 'active',
                                                      'slug': req.query.slug,
                                                    }
                                                  }, {
                                                    '$unwind': {
                                                      'path': '$lessons'
                                                    }
                                                  }, {
                                                    '$lookup': {
                                                      'from': 'lessons',
                                                      'localField': 'lessons.lessonId',
                                                      'foreignField': '_id',
                                                      'as': 'lookupResult'
                                                    }
                                                  }, {
                                                    '$unwind': {
                                                      'path': '$lookupResult'
                                                    }
                                                  }, {
                                                    '$group': {
                                                      '_id': '$id',
                                                      'lessons': {
                                                        '$push': '$lookupResult'
                                                      },
                                                      'label': {
                                                        '$first': '$label'
                                                      },
                                                      'slug': {
                                                        '$first': '$slug'
                                                      },
                                                      'category': {
                                                        '$first': '$category'
                                                      },
                                                      'mediaUrl': {
                                                        '$first': '$mediaUrl'
                                                      }
                                                    }
                                                  },
                                                  {
                                                    '$sort': {
                                                      'order': 1,
                                                    }
                                                  },
                                                ])
                                                .exec()
                                                .then(courseDetail => courseDetail[0]);
    return res.json(courseDetail);

  } else if(req.method === 'POST') {

    collection.replaceOne(
       { email: req?.data.email },
       req?.data,
       { upsert: true }
    );
    console.log('POST', req);
  }

}
