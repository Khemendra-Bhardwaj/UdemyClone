const mongoose = require('mongoose')

const publishCourse = new mongoose.Schema( {

    image:{
        type: String,
        required : true
    },
    description :{
        type : String,
        required: true
    },
    price:{
        type: Number,
        required: true 
    }
} )

// const MyCourses = mongoose.model("MyCourses",  UserCourses )
module.exports =  UserCourses
