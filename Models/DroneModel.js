const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const { stringify } = require('nodemon/lib/utils');

var Schema = mongoose.Schema;

var DroneSchema = new Schema({
    Drone_ID:{type:String,unique:true},
    DroneSize:{type:String, required:true},
    Endurance:{type:String, required:true},
    Range:{type:String, required:true}
    
})

const Drone= mongoose.model("Drone",DroneSchema);

module.exports = Drone;