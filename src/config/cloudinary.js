const cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
  cloud_name: "dblh78pvc",
  api_key: "517839929787991",
  api_secret: "rswcLCmk6ew6-HiA8_rbAowHYTk",
});

const getImageUrl = (publicId) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
};

// Приклад використання для тестування
const imageUrl = getImageUrl("products/gold/image1");
console.log(imageUrl);

module.exports = cloudinary;
