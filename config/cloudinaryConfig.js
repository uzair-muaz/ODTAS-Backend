require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dofxfcziq",
  api_key: process.env.API_KEY || "675683326712265",
  api_secret: process.env.API_SECRET || "D5f4z86gUtdlSZh77JCqC-m6GaE",
});
exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};

exports.delete = (id) =>{
  return new Promise((resolve) => {
  cloudinary.v2.uploader.destroy(id,{resource_type:'video'}).then((result)=>{
    resolve({result});
  })
})
}
exports.deleteImg = (id) =>{
  return new Promise((resolve) => {
  cloudinary.v2.uploader.destroy(id,{resource_type:'image'}).then((result)=>{
    resolve({result});
  })
})
}

// module.exports= cloudinary;