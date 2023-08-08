const mongoose = require('mongoose')
// const courseSchema = require('./UserCourses')

const UserSchema = new mongoose.Schema( {
    name:{
        type: String,
        required : true
    },
    password :{
        type : String,
        required: true
    },
    // myCourses :[courseSchema] 
} )

const User = mongoose.model("User",  UserSchema )
module.exports = { User} 