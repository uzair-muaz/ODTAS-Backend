const imageModel = require("../Models/imageModel");
const DroneOperator = require('../Models/DroneOperator');

//IMPORT CLOUDINARY CONFIG
const cloud = require("../config/cloudinaryConfig");

module.exports = {
  createImage: (req, res) => {
    let imageDetails = {
      imageName: req.files[0].originalname,
    };
    //USING MONGODB QUERY METHOD TO FIND IF IMAGE-NAME EXIST IN THE DB
    imageModel.find({ imageName: imageDetails.imageName }, (err, callback) => {
      //CHECKING IF ERROR OCCURRED.
      if (err) {
        res.json({
          err: err,
          message: `There was a problem creating the image because: ${err.message}`,
        });
      } else {
        let attempt = {
          imageName: req.files[0].originalname,
          imageUrl: req.files[0].path,
          imageId: "",
        };
        cloud.uploads(attempt.imageUrl).then((results) => {
          console.log(req.body.UserName)
          const droneOperator = new DroneOperator({
            UserName: req.body.UserName,
            Password: req.body.Password,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
            Address: req.body.Address,
            Gender: req.body.Gender,
            FullName: req.body.FullName,
            Drone_ID: req.body.DroneID,
            Avatar: results.url
          })
          droneOperator.save().then((result) => {
            console.log(result);
            let imageDetails = {
              imageName: req.files[0].originalname,
              imageUrl: results.url,
              imageId: results.id,
              OpID: result.id
            };
            imageModel
              .create(imageDetails)
              .then((image) => {
                console.log("Operator and Image Succesfully")
              })
              .catch((error) => {
                res.json({
                  success: false,
                  message: `Error creating image in the database: ${error.message}`,
                });
              });
          }).catch((error) => {
            console.log(error);//error in operator addition
            res.json(error)
          })
          // Create image in the database


        });
      }
    });
  },
  // uploadImage:(req,res)=>{
  //   console.log(req.body.UserName)
  // if(req.files[0] == undefined){
  //   console.log('in if update')
  //   DroneOperator.findByIdAndUpdate({_id:req.params.id},{UserName:req.body.UserName,Address:req.body.Address,FullName:req.body.FullName,PhoneNumber:req.body.PhoneNumber,Email:req.body.Email}).then((results)=>{
  //     res.json(results);
  //   }).catch((err)=>{
  //     res.json(err)
  //   })
  // }
  // else{
  //   console.log('in else update')
  //   var OpName = req.body.UserName;
  //   var OpFullName= req.body.FullName;
  //   var OpAddress = req.body.Address;
  //   var OpNumber = req.body.PhoneNumber;
  //   var OpEmail = req.body.Email; 
  //  Image.findOneAndDelete({OpID:req.params.id}).then((results)=>{
  //   cloud.deleteImg(results.id).then((result)=>{
  //     console.log('Image deleted from cloud');
  //     console.log('in delete'+OpName);
  //     cloud.uploads(req.files[0].path).then((image)=>{
  //       console.log(OpName+"in upload");
  //       DroneOperator.findByIdAndUpdate({_id:req.params.id},{UserName:OpName,Address:OpAddress,FullName:OpFullName,PhoneNumber:OpNumber,Email:req.body.OpEmail,Avatar:image.url}).then((imageModel)=>{
  //         let imageDetails = {
  //           imageName: req.files[0].originalname,
  //           imageUrl: results.url,
  //           imageId: results.id,
  //           OpID: req.params.id
  //         }
  //         imageModel
  //         .create(imageDetails)
  //         .then((image) => {
  //           console.log("Operator and Image UpdatedSuccesfully")
  //         }).catch((err)=>{
  //           console.log('image creation error'+err)
  //         })
  //       }).catch((err)=>{
  //         console.log('Operator updatation error'+err)
  //       })
  //     }).catch((err)=>{
  //       console.log("cloud upload error"+err);
  //     })
  //   }).catch((err)=>{
  //     console.log('image deletion error'+err);
  //   })
  //  })
    
  // }
  // }
  uploadImage:(req, res) => {
    let imageDetails = {
      imageName: req.files[0].originalname,
    };
    console.log(req.body.UserName);
    imageModel.findOneAndDelete({OpID:req.params.id}).then((results)=>{
       console.log(results);
        cloud.deleteImg(results.imageId).then((result)=>{
          console.log('Image deleted from cloud');
        });})
    //USING MONGODB QUERY METHOD TO FIND IF IMAGE-NAME EXIST IN THE DB
    imageModel.find({ imageName: imageDetails.imageName }, (err, callback) => {
      //CHECKING IF ERROR OCCURRED.
      if (err) {
        res.json({
          err: err,
          message: `There was a problem creating the image because: ${err.message}`,
        });
      } else {
        let attempt = {
          imageName: req.files[0].originalname,
          imageUrl: req.files[0].path,
          imageId: "",
        };
        cloud.uploads(attempt.imageUrl).then((results) => {
          console.log(req.body.UserName)
          DroneOperator.findByIdAndUpdate({_id:req.params.id},{UserName:req.body.UserName,Address:req.body.Address,FullName:req.body.FullName,PhoneNumber:req.body.PhoneNumber,Email:req.body.Email,Avatar:results.url}).then((result) => {
            console.log(result);
            let imageDetails = {
              imageName: req.files[0].originalname,
              imageUrl: results.url,
              imageId: results.id,
              OpID: result.id
            };
            imageModel
              .create(imageDetails)
              .then((image) => {
                console.log("Operator and Image  UpdatedSuccesfully")
                res.status(201); console.log("Operator Updated Succesfully"); res.json(result)
              })
              .catch((error) => {
                res.json({
                  success: false,
                  message: `Error creating image in the database: ${error.message}`,
                });
              });
          }).catch((error) => {
            console.log(error);//error in operator addition
            res.json(error)
          })
          // Create image in the database

        });
      }
    });
  }
}