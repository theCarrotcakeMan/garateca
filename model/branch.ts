const mongoose = require('mongoose');
const { Schema } = mongoose;

const branchSchema = new Schema({
                                  name: String,
                                  status: String,
                                  slug: String,
                                  legacyId: Number,
                                  status: String,
                                  address: mongoose.Mixed,
                                });

// Create and export the Branch model
module.exports = mongoose.models.Branch || mongoose.model('Branch', branchSchema);
