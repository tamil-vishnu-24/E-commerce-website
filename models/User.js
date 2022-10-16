const mongoose = require("mongoose");
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : "Name is required"
    } ,

    email : {
        type : String , 
        required : "Email address is required" ,
        unique :  true ,
        lowercase : true ,
        validate : [isEmail , "Enter a Valid Email"]

    } ,
    password : {
        type : String ,
        required : true
    },
    cart : {
        type : Array ,
        default : []
    } ,
    role : {
        type :Number ,
        default : 0
    },
    phonenumber :{
        type : Number ,
        required : true

    } ,
    register_date : {
        type : Date ,
        default : Date.now
    }
})

module.exports = User = mongoose.model('user' ,userSchema);