const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs =  require("fs");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin")

//Uploading image ur cloudinary

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME ,
    api_key : process.env.CLOUD_API_KEY ,
    api_secret : process.env.CLOUD_API_SECRET
})
//upload image
router.post("/upload" , (req,res) => {

    console.log(req.files)
    if(!req.files || Object.keys(req.files).length === 0)
    {
        return res.status(400).send("No files uploaded")
    }
    const file = req.files.file ;
    // if(file.size > 1024*1024)
    // {
    //     removeTap(file.tempFilePath)
    //     return res.status(400).json({msg : "Size too large"})

    // }
    if (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
    {
        removeTap(file.tempFilePath)
        return res.status(400).json({msg : "Incorrect file format"})
    }

    cloudinary.v2.uploader.upload(file.tempFilePath , {folder : "test"}, async (err , result) => {
        if(err)
        {
            throw(err) ;
        }
        removeTap(file.tempFilePath)
        res.json({public_id : result.public_id , url : result.secure_url}) ;

    })

   //res.json("Uploaded successfully") ;
  

})
//Delete image
router.post("/destroy" ,auth , authAdmin , (req,res) => {
   const {public_id} = req.body ;
    if(!public_id)
    {
        return res.status(400).json({msg : "No images are selected!!"})

    }
    cloudinary.v2.uploader.destroy(public_id , async(err , result) => {
        if(err) throw err ;
        res.json({msg : "Images deleted!!"});
    })
})
const removeTap = (path) => {
    fs.unlink(path , err => {
        if(err) throw err ;
    })
}

module.exports = router ;