const mongoose = require("mongoose");
const { Schema } = mongoose;

const BugSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },

  status: {
    type: String,
    enum: ["New", "Assigned", "In Progress", "Testing", "Resolved"],
    required: true,
    default: "New",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
});

module.exports = mongoose.model("bug", BugSchema);
