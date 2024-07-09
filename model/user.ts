const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
                                username: String,
                                firstName: String,
                                lastName: String,
                                status: String,
                                role: String,
                                branchId: Array,
                                email: String,
                                password: String,
                                created: String,
                                modified: String,
                              },
                              {
                                timestamps: {
                                  createdAt: 'created_at',
                                  fieldType: Number,
                                  dateFunc: function () {
                                    return Math.round(new Date().getTime()/1000); /* timestamp in seconds */
                                  }
                                },
                              });

// Create and export the User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
