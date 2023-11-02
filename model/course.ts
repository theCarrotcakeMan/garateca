const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
                                  label: String,
                                  status: String,
                                  slug: String,
                                  order: Number,
                                  status: String,
                                  category: String,
                                  lessons: mongoose.Mixed,
                                });

// Create and export the Course model
module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
