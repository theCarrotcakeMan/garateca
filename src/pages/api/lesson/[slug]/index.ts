import { mongoose } from 'mongoose';
import dbConnection from 'src/lib/db';
import Lesson from 'model/lesson';
// import { reduceUser } from 'src/lib/reductors';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    const lessonDetail = await Lesson.aggregate([
                                                  {
                                                    '$lookup': {
                                                      'from': 'content',
                                                      'localField': 'contentHolder',
                                                      'foreignField': 'contentHolder',
                                                      'as': 'contents'
                                                    }
                                                  }
                                                ])
                                                .exec()
                                                .then(lessonDetail => lessonDetail[0]);
    return res.json(lessonDetail);

  } else if(req.method === 'POST') {

    collection.replaceOne(
       { email: req?.data.email },
       req?.data,
       { upsert: true }
    );
    console.log('POST', req);
  }

}
