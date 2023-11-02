const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeRoleSchema = new Schema({
                                        name: String,
                                        status: String,
                                        slug: String,
                                        legacyId: Number,
                                        status: String,
                                        description: String,
                                      },
                                      {
                                        timestamps: {
                                          currentTime: () => Math.floor(Date.now() / 1000),
                                        },
                                        collection: 'employeeRoles',
                                      });

// Create and export the Role model
module.exports = mongoose.models.EmployeeRole || mongoose.model('EmployeeRole', employeeRoleSchema);
