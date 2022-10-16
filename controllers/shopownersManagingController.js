const shopOwner = require("../models/shopOwner");

//only admin has access in managing shopowners
const shopownerManagingController = {
    getshopOwners : async(req , res) =>{
        shopOwner.find(function(err , shopowners)  {
            if(err)
            {
                return res.status(500).json({msg : err.message})
            }
            res.json({shopowners})
        })
    } ,
    createshopOwner : async (req , res) => {
        const {name , email , phonenumber , photo } = req.body ;
        const shopowner = await shopOwner.findOne({shopowner_id});
        if(shopowner)
        {
            return res.status(400).json({ msg : "ShopDetails aldready exists!!"})
        }
        const newshopOwner = new shopOwner({name , email , phonenumber , photo})
        await newshopOwner.save()
        res.json({msg : " New shopOwner added"}) ;

    } ,
    deleteshopowner : async (req , res) => {
        await shopOwner.findByIdAndDelete(req.params.id);
        res.json({msg : "Deleted a shopOwner"});
    } ,
    updateshopOwner : async (req , res) => {
        await shopOwner.findByIdAndUpdate({_id : req.params.id} , {name , email , phonenumber , photo})
        res.json({msg : "ShopOwner got updated!!!"})
    }
}

module.exports = shopownerManagingController ;