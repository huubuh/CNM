const Router = require("express").Router;
const router = Router();
const productController = require("../controller/product.controller");
const upload = require("../middleware/upload");

//router.get("/", (req, res) => {
//  res.render("products");
//});
router.get("/products", productController.get);
router.get("/products/add", productController.showAdd);
router.post("/products/add", upload, productController.post);
// sữa sản phẩm
router.get("/products/:id", productController.getOne);
// cập nhật sản phẩm
router.post("/products/edit/:id", upload, productController.put);
// xóa sản phẩm
router.post("/products/delete/:id", productController.delete);

module.exports = router;
