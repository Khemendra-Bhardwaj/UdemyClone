// mainSchema.js
const mongoose = require('mongoose');
const MyCourses = require('./UserCourses');

const mainSchema = new mongoose.Schema({
  courses: [MyCourses],
});

const CourseModel = mongoose.model('Course', mainSchema);

module.exports = {CourseModel};
