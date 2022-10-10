const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var Schema = mongoose.Schema;

var DroneOperatorSchema = new Schema({
   
    UserName:String,
    Password:String,
    Email:String,
    PhoneNumber:Number,
    Address:String,
    Gender:String,
    FullName:String,
    Avatar:String,
    Drone_ID:{type:mongoose.Types.ObjectId,ref:'Drone'}
})

const DroneOperator = mongoose.model("DroneOperator",DroneOperatorSchema);

module.exports = DroneOperator;