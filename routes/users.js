var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const DroneOperator = require('../Models/DroneOperator');
const Drone = require('../Models/DroneModel')
const Image = require('../Models/imageModel')
const upload= require("../config/multerConfig"),
cloud = require("../config/cloudinaryConfig");
imageController = require("../controllers/imageController");


// const storage = multer.diskStorage({
//   destination: function(req,file, cb){
//     console.log('here')
//     cb(null,'./uploads');
//   },
//   filename: function(req,file, cb){
//       cb(null, file.originalname)
//   }
// })

// const fileFilter1 = (req,file,cb)=>{
//   if( file.mimetype === 'image/jpeg'  || file.mimetype ==='image/png' || file.mimetype === 'image/jfif'){
//     console.log('in file mime type')
//     cb(null,true);
//   }
//   else{
//     console.log('in false')
//     cb(null,false);
//   }

// }

// const upload = multer({
//   storage:storage,
//  fileFilter: fileFilter1
// })

/* GET users listing. */

// router.post('/addDrone',function(req, res, next) {
 
//   Drone.create(req.body).then((results)=>{
//    console.log(results);
//    res.json(results);
//   })
   
//  });
router.post('/addUser', upload.imageUpload.any(),imageController.createImage) 
  // console.log("file path is "+req.file.path)
  // const path= "http://localhost:4000/"+req.file.path.replace(/\\/g,"/");
  // console.log("file path is "+path)
  // const droneOperator = new DroneOperator({
  //   UserName: req.body.UserName,
  //   Password: req.body.Password,
  //   Email: req.body.Email,
  //   PhoneNumber: req.body.PhoneNumber,
  //   Address: req.body.Address,
  //   Gender: req.body.Gender,
  //   FullName: req.body.FullName,
  //   Drone_ID: req.body.DroneID,
  // })

  // droneOperator.save().then((result)=>{console.log(result); res.status(201); console.log("Operator added Succesfully"); res.json(result)}).catch((error)=>{
  //   console.log(error);
  //   res.json(error)
  // })

// }); 
router.post('/addUser/:id', upload.imageUpload.any(), imageController.uploadImage)

  // console.log(req.body.UserName)
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
    
  // };

router.post('/addDrone',upload.imageUpload.any(), async function(req, res, next) {
   check = false;
  try{
    
  const droneOperator = new Drone({
    Drone_ID:req.body.DroneID,
    DroneSize: req.body.DroneSize,
    Endurance: req.body.Endurance,
    Range: req.body.Range
  })
  await droneOperator.save();
  res.status(201).send('Drone added successfully');
  console.log(droneOperator)

}
  catch(error){
    console.log(error.name);
    if (error.name === "ValidationError") {
      let errors = {};
  
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      console.log(errors);
      res.status(400).send('Please fill all the required fields');
      
    }
    if(error.name==="MongoServerError"){
      console.log('here in second if')
      console.log(error);
      res.status(400).send('Drone ID not unique');
    }
    
  }
});

router.get('/drone',function(req,res,next){
  Drone.find().exec((err,results)=>{
    res.json(results);
  })
})
// router.post('/addDrone',(req,res,next)=>{
//   const newDrone = new Drone({
//     DroneSize:req.body.DroneSize,
//     Range:req.body.Range,
//     Endurance:req.body.Endurance,
//   })
//   newDrone.save().then((result)=>{console.log(result); res.status(201); console.log("Operator added Succesfully"); res.json(result)}).catch((error)=>{
//     console.log(error);
//     res.json(error)
//   })
// })

router.get('/',(req,res,next)=>{
console.log('here')
  DroneOperator.find().populate('Drone_ID').exec((err,results)=>{
    if(err){
      console.log(err)
      return(next(err))
    }
    res.json(results);

  })
})

router.get('/:id',(req,res,next)=>{
    DroneOperator.findById({_id:req.params.id}).exec((err,results)=>{
      if(err){
        console.log(err)
        return(next(err))
      }
      res.json(results);
    })
  })

router.delete('/:id',(req,res)=>{
  DroneOperator.findByIdAndDelete({_id:req.params.id}).then((req,res)=>{
    res.send("Delete Successfully")
  }).catch(err=>{
    res.send('deletetion failed')
  })
})






module.exports = router;
