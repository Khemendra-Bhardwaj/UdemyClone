const mongoose = require('mongoose')

const UserCourses = new mongoose.Schema( {
    userName :{
        type: String, 
        required: true 
    } , 
    image:{
        type: String,
        required : true
    },
    description :{
        type : String,
        required: true
    },
    price : {
        type : String,
        required: false ,
        default: 100
    },

} )

const MyCourses = mongoose.model("MyCourses",  UserCourses )
module.exports =  {MyCourses}
