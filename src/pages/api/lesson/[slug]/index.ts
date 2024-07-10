import { mongoose } from 'mongoose';
import dbConnection from '/src/lib/db';
import Lesson from '/model/lesson';
import Progress from '/model/progress';
// import { reduceUser } from 'src/lib/reductors';
import type { NextApiRequest, NextApiResponse } from 'next';

const fetchLessonDetails = async function() {
  return Lesson.aggregate([
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
                                        .then(lessonDetail => lessonDetail[0])
}

const fetchLessonProgress = async function() {
  return Progress.find( {
                          '$or': [
                              { 'status': 'completed' },
                              { 'status': 'pending' },
                          ]
                        }
                        )
                        .exec()
                        .then(lessonProgress => lessonProgress);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    const [lessonDetail, lessonProgress] = await Promise.all([
                                          fetchLessonDetails(),
                                          fetchLessonProgress(),
                                        ]);

    // Separate this into a different api

    return res.json({...lessonDetail, progress: lessonProgress });

  } else if(req.method === 'POST') {

    collection.replaceOne(
       { email: req?.data.email },
       req?.data,
       { upsert: true }
    );
    console.log('POST', req);
  }

}
