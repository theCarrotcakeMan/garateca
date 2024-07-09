const mongoose = require('mongoose');
const { Schema } = mongoose;

const lessonSchema = new Schema({
                                  name: String,
                                  slug: String,
                                  status: String,
                                  contentHolder: Number,
                                  contentCount: Number,
                                  mediaUrl: String,
                                });

// Create and export the Lesson model
const Lesson = mongoose.models.Lesson || mongoose.model('Lesson', lessonSchema);

export default Lesson;
