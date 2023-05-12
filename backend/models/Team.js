const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamSchema = new Schema({
  teamcode: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type : mongoose.Schema.Types.ObjectID,
    ref: "user",
    required: true,
  },
  admins: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }],
    required: true,
    default: function() {
      return [this.creator];
    }
  },
  members: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user',
    default: function() {
      return [this.admins];
    }
  }],
  projects: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'project' 
  }],
});

module.exports = mongoose.model("team", TeamSchema);
