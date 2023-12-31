const mongoose = require('mongoose')

const GlobalCourses = new mongoose.Schema( {
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
        required: false,
        default : 100 
    }
} )

const AllCourses = mongoose.model("AllCourses",  GlobalCourses )
module.exports = { AllCourses} 