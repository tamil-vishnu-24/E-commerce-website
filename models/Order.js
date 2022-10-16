const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId : {
        type : String
    } ,
    items : [{
        productId : {
            type : String
        } ,
        name : String ,
        quantity :{
            type : Number ,
            required : true ,
            min : 1 ,
            default : 1
        } ,
        price : Number
    }] ,
    bill :{
        type : Number ,
        required : true ,
        default : 0
    }
});

module.exports =  Cart = mongoose.model("order" , cartSchema);