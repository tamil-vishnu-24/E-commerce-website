const {Router} = require("express");
const shopownerController = require("../controllers/shopownersControllers");
const router = Router() ;
const user = require("../middleware/auth");


//router.post("/register" , shopownerController.signup); //registering route
router.post("/login" , shopownerController.login); //login to website
router.get("/user" , user , shopownerController.getUser); //whether user logged in
router.get("/logout" , shopownerController.logout);
router.get("/refresh_token" , shopownerController.refreshToken);
module.exports = router ;