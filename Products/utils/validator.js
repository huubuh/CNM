const nameRegex = /^[\p{L}0-9\s]+$/u;
const numberRegex = /^[0-9]+$/;

const checkEmpty = (payload) => {
  const { name, price, quantity } = payload;

  if (!name || !price || !quantity) {
    return true;
  }

  return false;
};

module.exports = {
  validateProduct: (payload) => {
    const { name, price, quantity } = payload;
    const errors = [];

    if (checkEmpty(payload)) {
      errors.push("All fields are required");
    }

    if (name && !nameRegex.test(name)) {
      errors.push("Tên không được để trống");
    }

    if (price && (!numberRegex.test(price) || Number(price) <= 0)) {
      errors.push("Giá phải > 0");
    }

    if (quantity && (!numberRegex.test(quantity) || Number(quantity) < 0)) {
      errors.push("Số lượng >= 0");
    }

    if (errors.length > 0) {
      return errors;
    }

    return null;
  },
};
