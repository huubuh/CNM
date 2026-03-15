require("dotenv").config();
const { s3 } = require("../utils/aws-helper");

// tạo tên file random
const randomString = (numberCharacter) => {
  return `${Math.random()
    .toString(36)
    .substring(2, numberCharacter + 2)}`;
};

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

const uploadFile = async (file) => {
  if (!file) {
    throw new Error("File is required");
  }
  // Tạo tên file mới với định dạng: randomString(4)-timestamp-originalname
  const filePath = `${randomString(4)}-${Date.now()}-${file.originalname}`;

  // kiểm tra file có phải hình không
  if (!IMAGE_TYPES.includes(file.mimetype)) {
    throw new Error("Only image files are allowed!");
  }
  // Tạo một object uploadParams chứa thông tin của file cần upload
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME,
    Body: file?.buffer,
    Key: filePath,
    ContentType: file?.mimetype,
  };

  try {
    //Thực hiện upload file lên AWS S3 bằng method upload
    const data = await s3.upload(uploadParams).promise();

    console.log(`File uploaded successfully. ${data.Location}`);
    return data.Location;
  } catch (error) {
    console.error("Upload hình thất bại", error);
    throw error;
  }
};

module.exports = { uploadFile };
