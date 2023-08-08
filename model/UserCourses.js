const mongoose = require('mongoose')

const UserCourses = new mongoose.Schema( {
    image:{
        type: String,
        required : true
    },
    description :{
        type : String,
        required: true
    },
    progress: {
        type: Number,
        required : true 
    }
} )

// const MyCourses = mongoose.model("MyCourses",  UserCourses )
module.exports =  UserCourses
