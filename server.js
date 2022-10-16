require('dotenv').config()
const express = require("express"); //Node js framework
const mongoose = require("mongoose"); //MongoDB
const path = require("path");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const cookieParser = require('cookie-parser');
const app = express() ;

app.use(express.json()) ;
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload({
    useTempFiles : true
}))

/*if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build')) ;
    app.get("*" , (req , res) => {
        res.sendFile(path.resolve(_dirname , 'client' , 'build' ,'index.html'));
    });
}*/
app.get("/" , function(req , res)
{
    res.json({msg : "Welcome to the home page!!!"})
})
//Routes
app.use("/user" , require("./routes/userRouters"))
//app.use("/dealer" , require("./routes/shopownerRouters"))
app.use("/api" , require("./routes/commodityRouters"))
app.use("/api" , require("./routes/upload"))
app.use("/api" , require("./routes/productRouters"))
//app.use("/api" , require("./routes/shopOwnersmanagingRoutes"))

//Connecting to mongoDB
const mongoURL = process.env.mongoDBURL ;
const port = process.env.PORT || 4000 ;
mongoose.connect(mongoURL , {useNewUrlParser:true , useUnifiedTopology:true } , err=> {
    if(err) throw err ;
    else{console.log("Connected to MongoDB");}
    
})

app.listen(port , function()
{
    console.log("server is running on " , port);
})
    