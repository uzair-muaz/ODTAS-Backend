//CommentforPush2.0


var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Drone = require('../Models/DroneModel');
const Test = require('../Models/TestModel');

router.get('/:id',(req,res,next)=>{
    Drone.findById({_id:req.params.id}).exec((err,results)=>{
      if(err){
        console.log(err)
        return(next(err))
      }
      res.json(results);
    })
  })

router.delete('/:id',(req,res)=>{
  Drone.findByIdAndDelete({_id:req.params.id}).then((req,res)=>{
    res.send("Delete Successfully")
  }).catch(err=>{
    res.send('deletetion failed')
  })
})

router.post('/addDrone',(req,res,next)=>{
  const newDrone = new Drone({
    DroneSize:req.body.DroneSize,
    Range:req.body.Range,
    Endurance:req.body.Endurance,
    Location:'Pakistan'
  })
  console.log(req.body)
  newDrone.save().then((result)=>{console.log(result); res.status(201); console.log("Operator added Succesfully"); res.json(result)}).catch((error)=>{
    console.log(error);
    res.json(error)
  })
})
router.post('/addTest',function(req,res,next){
  const test = new Test({
    UserName:req.body.UserName
  })
  test.save().then((result)=>{
    console.log(result)
    res.json(result)
  })
})

   router.get('/',(req,res,next)=>{
    Drone.find().exec((err,results)=>{
        if(err){
            console.log(err);
            return(next(err));
        }
        res.status(200).json(results)
    })
   })

   router.put('/addDrone/:id',  function(req, res, next) {
    
      Drone.findByIdAndUpdate({_id:req.params.id},{DroneSize:req.body.DroneSize,Endurance:req.body.Endurance,Range:req.body.Range}).then((results)=>{
        res.status(200).json(results);
      }).catch((err)=>{
        res.json(err)
      })
    
  });

  module.exports = router;
  
