const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
    shopname : {
        type : String ,
        required : true
    } ,
    shopdescription : {
        type : String ,
        required : true
    } ,
    shopimage : {
        data : Buffer ,
        required:true
    }
})