require("dotenv").config();
const AWS = require("aws-sdk");
//load enviroment lấy giá trị từ file .env để config cho AWS SDK

AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID, // access key ID của IAM user có quyền truy cập vào DynamoDB
  secretAccessKey: process.env.SECRET_ACCESS_KEY, // Secret access key của IAM user có quyền truy cập vào DynamoDB
});

const s3 = new AWS.S3(); // khởi tạo S3 service object

const dynamodb = new AWS.DynamoDB.DocumentClient(); // khởi tạo DynamoDB service

module.exports = { s3, dynamodb };
