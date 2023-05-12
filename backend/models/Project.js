const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProjectSchema = new Schema({
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
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  },
});
module.exports = mongoose.model("project", ProjectSchema);
