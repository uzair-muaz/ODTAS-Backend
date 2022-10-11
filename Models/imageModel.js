const mongoose = require('mongoose'),
      {Schema} = mongoose,
      imageSchema = new Schema({
        imageName: {
          type: String,
          required: true
          },
        imageId: {
          type: String,
          },
        imageUrl: {
          type: String,
        },
        OpID:{
            type:String
        }
     });

const Image = mongoose.model("Image", imageSchema)

module.exports = Image