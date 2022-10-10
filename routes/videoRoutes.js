
const mongoose = require('mongoose');
const Videos = require('../Models/videoModel');
cloud = require("../config/cloudinaryConfig");

const videoController = require("../controllers/videoController"),
  upload = require("../config/multerConfig"),
  router = require("express").Router();
  delete
// const cloud = require('../config/cloudinaryConfig');

router
  .post("/postVideo", upload.videoUpload.any(), videoController.create)

router
  .get('/getVideos',function(req,res,next){
    Videos.find().exec((err,results)=>{
      if(err){
        console.log(err)
      return(next(err))
      }
      res.json(results);

    })

    })

router.delete('/:id',function(req,res,next){
  Videos.findOneAndDelete({_id:req.params.id}).exec((err,results)=>{
    if(err){
      console.log(err);
      next(err);
    }
    console.log(results);
    const delvid= results.id;
    console.log(delvid)
     cloud.delete(delvid)
     .then(result=>{console.log(result)
      res.status(201).send('Deletion Successfull');
    }).catch((err)=>{
      res.status(400).send('Deletion Successfull');
    });

  })
})

  

module.exports = router;