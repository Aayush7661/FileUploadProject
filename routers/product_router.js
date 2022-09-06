const router = require('express').Router()
const { get_Product_By_KeyWord, ProductById, get_allproduct, delete_product, Product_edit, upload_product } = require('../controller/product')
const { verify_token } = require('../helpers/authentication')
const { upload_images } = require('../helpers/file-operations')


router.post("/addProduct", upload_images.array('product_img', 5), verify_token, upload_product)
router.patch("/editProduct", verify_token, Product_edit)
router.delete("/deleteProduct", verify_token, delete_product)
router.get("/getAllProduct", verify_token, get_allproduct)
router.post("/getProductById", verify_token, ProductById)
router.get("/getProductByKeyWord", get_Product_By_KeyWord)

module.exports = router;