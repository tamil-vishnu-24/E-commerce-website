const {Router} = require("express");
const router = Router() ;
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin")

const shopownerManagingController = require("../controllers/shopownersManagingController")

router.get("/shopowner" , auth , authAdmin , shopownerManagingController.getshopOwners);
router.post("/shopowner" , auth , authAdmin , shopownerManagingController.createshopOwner);
router.delete("/shopowner/:id" , auth , authAdmin , shopownerManagingController.deleteshopOwner);
router.put("/shopowner/:id" , auth , authAdmin , shopownerManagingController.updateshopOwner);