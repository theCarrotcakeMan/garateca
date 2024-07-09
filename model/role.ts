const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeRoleSchema = new Schema({
                                        name: String,
                                        status: String,
                                        slug: String,
                                        legacyId: Number,
                                        description: String,
                                      },
                                      {
                                        timestamps: {
                                          currentTime: () => Math.floor(Date.now() / 1000),
                                        },
                                        collection: 'employeeRoles',
                                      });

// Create and export the Role model
const Role = mongoose.models.EmployeeRole || mongoose.model('EmployeeRole', employeeRoleSchema);

export default Role;
