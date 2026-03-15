const ProductModel = require("../models/product");

const { uploadFile } = require("../service/file.service");
const { validateProduct } = require("../utils/validator");
const Controller = {};

Controller.get = async (req, res) => {
  try {
    const { search } = req.query;

    let products = await ProductModel.getProducts();

    if (search) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return res.render("products", { products, search });
  } catch (error) {
    console.log(error);
    res.status(500).send("error getting products");
  }
};

Controller.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.getOneProduct(id);

    if (!product) {
      return res.status(404).send("Không tìm thấy sản phẩm");
    }

    return res.render("edit", { product, errors: [] });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error getting product");
  }
};

// method post sẽ thực hiện tạo mới một product
Controller.post = async (req, res) => {
  try {
    const errors = validateProduct(req.body);

    if (errors) {
      return res.status(400).render("add", { errors });
    }

    if (!req.file) {
      return res.status(400).render("add", {
        errors: ["Vui lòng chọn ảnh"],
      });
    }

    const imageUrl = await uploadFile(req.file);

    await ProductModel.createProduct({
      ...req.body,
      image: imageUrl,
    });

    return res.redirect("/products");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Lỗi thêm sản phẩm");
  }
};

//method update

Controller.put = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const oldProduct = await ProductModel.getOneProduct(id);

    if (!oldProduct) {
      return res.status(404).send("Không tìm thấy sản phẩm");
    }

    const errors = validateProduct(req.body);

    if (errors) {
      return res.status(400).render("edit", {
        product: { ...oldProduct, ...req.body },
        errors,
      });
    }

    let imageUrl = oldProduct.image;

    if (req.file) {
      try {
        imageUrl = await uploadFile(req.file);
      } catch (error) {
        return res.status(500).render("edit", {
          product: oldProduct,
          errors: ["Upload ảnh thất bại"],
        });
      }
    }

    const product = await ProductModel.updateProducts(id, {
      name,
      image: imageUrl,
      price,
      quantity,
    });

    if (product) {
      return res.redirect("/products");
    }

    return res.status(404).send("Không tìm thấy sản phẩm");
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    return res.status(500).send("Lỗi cập nhật sản phẩm");
  }
};

// method delete sẽ thực hiện xóa product dựa vào id
Controller.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.deleteProduct(id);
    if (product) {
      console.log("Product deleted:", product);
      return res.redirect("/products");
    }

    return res.status(500).send("Xóa sản phẩm thất bại");
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    return res.status(500).send("Lỗi xóa sản phẩm");
  }
};
Controller.showAdd = async (req, res) => {
  try {
    return res.render("add", { errors: [] });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error loading add page");
  }
};
module.exports = Controller;
