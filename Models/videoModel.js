const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/ODTAS');
 var videoSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      url: {
        type: String,
      },
      id: {
        type: String,
        unique: true,
      },
      OpID:{
        type: mongoose.Types.ObjectId, ref:'DroneOperator'
      }
    },
    {
      timestamps: true,
    }
  );
const Video = mongoose.model("Video", videoSchema);

module.exports = Video;