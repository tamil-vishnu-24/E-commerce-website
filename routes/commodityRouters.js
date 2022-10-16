const {Router} = require("express");
const router = Router() ;
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin")
const authshopOwner = require("../middleware/authshopOwner")

const categoryController = require("../controllers/commodityController");

router.get("/category" , categoryController.getCategory);
router.post("/category" , auth , authAdmin , categoryController.createCategory );

router.delete("/category/:id" , auth , authAdmin , categoryController.deleteCategory);
router.put("/category/:id" , auth , authAdmin , categoryController.updateCatrgory)

module.exports = router ;
