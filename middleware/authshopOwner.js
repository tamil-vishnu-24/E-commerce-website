const User = require("../models/shopOwner");
const authAdmin = async (req , res , next) => {
    //get user info by id
    const user = await Users.findOne({
        _id : req.user.id
    })
    if(user.role == 0 )
    {
        return res.status(400).json({msg : "Admin access denied"})

    }
    next() ;

}
module.exports = authAdmin ;