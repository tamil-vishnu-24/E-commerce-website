const router = require("express").Router() ;
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin")

const productController =  require("../controllers/productController")
router.get("/products" , productController.getProducts) ;
router.post("/products" , productController.createProduct) ;
router.delete("/products/:id" , productController.deleteProduct)  ;
router.put("/products/:id" , productController.updateProduct) ;


module.exports = router ;