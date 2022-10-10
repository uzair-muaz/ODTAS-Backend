const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

var Schema = mongoose.Schema;

var TestSchema = new Schema({
   
    UserName:String,
    
})

const Test = mongoose.model("Test",TestSchema);

module.exports = Test;