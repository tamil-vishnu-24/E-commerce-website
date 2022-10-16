const Users = require("../models/User");
const authshopOwner = async (req , res , next) => {
    //get user info by id
    const user = await Users.findOne({
        _id : req.user.id
    })
    if(user.role == 0 || user.role ==1)
    {
        return res.status(400).json({msg : "Admin access denied"})

    }
    next() ;

}
module.exports = authshopOwner ;