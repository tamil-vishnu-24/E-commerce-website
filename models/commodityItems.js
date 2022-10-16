const mongoose = require("mongoose") ;

const commoditySchema = new mongoose.Schema({
     commodityname : {
        type : String ,
        required : "Enter commodity name"
    }
}, {
    timestamps : true
})

module.exports = commodityItems = mongoose.model("commodityitem" , commoditySchema) ;