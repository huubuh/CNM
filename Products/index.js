const express = require("express");
const app = express();
const productRoute = require("./routers/product.routes");
app.use(express.json({ extended: false })); // parse application (đọc dữ liệu json từ request body)
app.use(express.urlencoded({ extended: true })); // đọc dữ liệu từ form html

//render giao diện
app.use(express.static("./public"));
app.set("view engine", "ejs"); // sử dụng ejs làm view engine cho express
//app.set("views", "./views"); // thư mục chứa các file   ejs

// Router cho ứng dụng
app.use("/", productRoute);

app.listen(3000, () => {
  console.log("server is running at http://localhost:3000/products");
});
