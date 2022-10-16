const {Router} = require("express");
const userController = require("../controllers/userControllers");
const router = Router() ;
const user = require("../middleware/auth");


router.post("/register" , userController.signup); //registering route
router.post("/login" , userController.login); //login to website
router.get("/user" , user , userController.getUser); //whether user logged in
router.get("/logout" , userController.logout);
router.get("/refresh_token" , userController.refreshToken);
module.exports = router ;

