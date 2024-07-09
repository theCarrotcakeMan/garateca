const mongoose = require('mongoose');
const { Schema } = mongoose;

const branchSchema = new Schema({
                                  name: String,
                                  status: String,
                                  slug: String,
                                  legacyId: Number,
                                  address: mongoose.Mixed,
                                });

// Create and export the Branch model
const Branch = mongoose.models.Branch || mongoose.model('Branch', branchSchema);

export default Branch;
