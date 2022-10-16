const jwt = require('jsonwebtoken')

const auth = (req , res , next) => {
    const token = req.header("Authorization")
    if(!token)
    {
        return res.status(400).json({msg : "Authorization denied"})

    }
    //verify token
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET,(err , user) =>{
        if(err)
        {
            return res.status(400).json({msg : "Authorization denied"})

        }
        req.user = user; // id of the user
        next()
    })
    
}
module.exports = auth ;