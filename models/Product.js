const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id : {
        type : String ,
        required : true

    } ,
    title :{
        type :String ,
        required : true
    } ,
    description : {
        type : String ,
        required : true 
    } ,
    category : {
        type : String ,
        required : true 
    } ,
    price : {
        type : Number ,
        required : true
    } ,
    images : {
        type : Object ,
        required : true
    } ,
    // checked : {
    //     type : Boolean ,
    //     required : true
    // } ,
    // sold : {
    //     type : Number ,
    //     default : 0
    // } ,
    // availability : {
    //     type : Number ,
    //     required : 0
    // } ,
    content : {
        type : String ,
        required : true 
    } 
    
}  ,
{
    timestamps : true 
} ) ;
module.exports = Item = mongoose.model("product" , productSchema);