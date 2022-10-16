const mongoose = require("mongoose") ;
const {isEmail} = require("validator");
const shopownerSchema = new mongoose.Schema({
    shopowner_id : {
        type : String ,
        required : true

    } ,
    name : {
        type : String ,
        required : true
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true ,
        validate : [isEmail , "Enter a Valid Email"]
    } ,
    phonenumber : {
        type : Number ,
        required : true 
    },
    role : {
        type : Number ,
        default : 1 
    } ,
    photo : {
        data : Buffer ,
        contentType : String
    }
})

module.exports = shopOwner = mongoose.model("shopowner" , shopownerSchema);