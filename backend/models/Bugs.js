const mongoose = require("mongoose");
const { Schema } = mongoose;

const BugSchema = new Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tag: {
    type: String,
    default: "General",
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("note", BugSchema);