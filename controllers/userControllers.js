const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userController = {
    signup : async (req , res) =>{
    const {name , email , password , phonenumber} = req.body ;
    if(!name || !email || !password || !phonenumber)
    {
        res.status(400).json({msg : "Please enter all fields"});

    }
    const user = await User.findOne({email})
    
        if(user)
        {
            return res.status(400).json({msg : "User aldready exists"});
        }
        if(password.length < 8)
        {
            return res.status(400).json({msg : "Password should be more than 8"});
        }
        //password encryption
        const passwordHash = await bcrypt.hash(password , 10)
        //res.json({password , passwordHash})
        res.json({msg : "Registered successfully"}) ;

        const newUser = new User({name , email , password :passwordHash , phonenumber});
        //res.json({newUser})
        //save to mongoDB
        await newUser.save() ;
        //jsonwebtoken for authetication
        const accesstoken = createAccessToken({id:newUser._id}) ;
        //res.json({accesstoken})
        const refreshtoken = createRefreshToken({id:newUser._id});
        //res.json({refreshtoken})
        res.cookie('refreshtoken' , refreshtoken ,{
            httpOnly : true ,
            path : '/user/refresh_token'
        })

    } ,
    login : async (req , res) => {
        const {email , password} = req.body ;
        if(!email || !password)
        {
            return res.status(400).json({msg : "Please enter all the details"})
        }
        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({msg : "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch)
        {
            return res.status(500).json({msg : "Incorrect Password"})

        }
        //if login success , create access amd refresh token
        const accesstoken = createAccessToken({id:user._id}) ;
        //res.json({accesstoken})
        const refreshtoken = createRefreshToken({id:user._id});
        //res.json({refreshtoken})
        res.cookie('refreshtoken' , refreshtoken ,{
            httpOnly : true ,
            path : '/user/refresh_token'
        })
        res.json({accesstoken});
    } ,
    logout : async (req , res) => {
        res.clearCookie('refreshtoken' , {path : "/user/refresh_token"})
        return res.json({msg : "Logged out"});
    } ,
    refreshToken : (req , res) => {
        const rf_token = req.cookies.refreshtoken ;
        //res.json({rf_token})
        if(!rf_token)
        {
            return res.status(400).json({msg : "Please login or register!"})

        }
        jwt.verify(rf_token , process.env.REFRESH_TOKEN_SECRET ,(err , user) =>{
            if(err)
            {
                return res.status(400).json({msg : "Please login or register"})

            }
            
            const accesstoken = createAccessToken({id : user.id})
            res.json({accesstoken})
        })
        //res.json({rf_token});
    },
    getUser : async (req , res) => {
        const user = await User.findById(req.user.id).select('-password')
        if(!user)
        {
            return res.status(400).json({msg : "User does not exist"})

        }
        res.json(user) ;
        //res.json(req.user) Id of the user
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user , process.env.ACCESS_TOKEN_SECRET , {expiresIn : "1d"})
}
const createRefreshToken = (user) => {
    return jwt.sign(user , process.env.REFRESH_TOKEN_SECRET,{expiresIn : "7d"})
}

module.exports = userController ;