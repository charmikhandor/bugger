const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  },
  teamrole:{
    type: String,
    default: "member",
  },
  //can be member or  admin(creater of the team)
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
