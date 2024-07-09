const mongoose = require('mongoose');
const { Schema } = mongoose;

const progressSchema = new Schema({
                                  owner: mongoose.Types.ObjectId,
                                  courseId: mongoose.Types.ObjectId,
                                  lastSaved: String,
                                  courseSlug: String,
                                  status: String,
                                  lessonId: mongoose.Types.ObjectId,
                                  lessonSlug: String,
                                });

// Create and export the Course model
const Progress = mongoose.models.Progress || mongoose.model('Progress', progressSchema);

export default Progress;
