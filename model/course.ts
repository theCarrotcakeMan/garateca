const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
                                  label: String,
                                  status: String,
                                  slug: String,
                                  order: Number,
                                  category: String,
                                  lessons: mongoose.Mixed,
                                });

// Create and export the Course model
const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default Course;
