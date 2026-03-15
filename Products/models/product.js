const { dynamodb } = require("../utils/aws-helper");
const { v4: uuidv4 } = require("uuid");

const tableName = "Products";

//Tạo object ProductModel chứa các method crud để thao tác với dynamodb
const ProductModel = {
  async createProduct(productData) {
    // tạo một unique ID cho Product
    const productId = uuidv4();

    const params = {
      TableName: tableName,
      Item: {
        id: productId,
        name: productData.name,
        image: productData.image,
        price: productData.price,
        quantity: productData.quantity,
      },
    };
    try {
      await dynamodb.put(params).promise(); // thêm subject vào table bằng method put
      return { id: productId, ...productData };
    } catch (error) {
      console.error("Lỗi tạo subject", error);
      throw error;
    }
  },

  // method getProducts lấy danh sách sản phẩm từ bảng products
  async getProducts() {
    // tạo 1 object params chứa thôn tin của table products
    const params = {
      TableName: tableName,
    };
    try {
      // lấy tất cả thông tin products bằng scan
      const products = await dynamodb.scan(params).promise();
      // trả về thông tin product đã lấy
      return products.Items;
    } catch (error) {
      console.error("lấy danh sách sản phẩm thất bại", error);
      throw error;
    }
  },

  // method update
  async updateProducts(productId, productData) {
    // tạo 1 object params chứa thông tin của product cần cập nhật
    const params = {
      TableName: tableName,
      Key: {
        id: productId,
      },
      UpdateExpression:
        "set #n = :name, #i = :image, #p = :price, #q = :quantity", // Cập nhật các trường name, image, price,quantity
      ExpressionAttributeNames: {
        // Alias cho các trường cần cập nhật
        "#n": "name",
        "#i": "image",
        "#p": "price",
        "#q": "quantity",
      },
      // giá trị mới của các trường cần cập nhật
      ExpressionAttributeValues: {
        ":name": productData.name,
        ":image": productData.image,
        ":price": productData.price,
        ":quantity": productData.quantity,
      },
      ReturnValues: "ALL_NEW", //  trả về thông tin subject sau khi cập nhật
    };

    try {
      // cập nhật = method update
      const updatedProduct = await dynamodb.update(params).promise();
      return updatedProduct.Attributes; // trả về thông tin của product sau khi update
    } catch (error) {
      console.error("Cập nhật thất bại", error);
      throw error;
    }
  },

  // method  delete
  async deleteProduct(productId) {
    const params = {
      TableName: tableName,
      Key: {
        id: productId,
      },
    };

    try {
      await dynamodb.delete(params).promise();
      return { id: productId };
    } catch (error) {
      console.error("Xóa sản phẩm thất bại");
      throw error;
    }
  },

  // lấy 1 sản phẩm dựa trên productId

  async getOneProduct(productId) {
    const params = {
      TableName: tableName,
      Key: {
        id: productId,
      },
    };
    try {
      const data = await dynamodb.get(params).promise(); // lấy thông tin của product dựa trên productId
      return data.Item; // trả về thông tin của object đã lấy
    } catch (error) {
      console.error("lấy thông tin 1 sản phẩm thất bại", error);
      throw error;
    }
  },
};

module.exports = ProductModel;
