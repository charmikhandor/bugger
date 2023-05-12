const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_sec = "heheh";
//create a user using POST"/api/auth/createuser" doesn't require auth
router.post(
  "/createuser",
  [
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors, return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //check whether the user(email) exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        username: req.body.username,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_sec);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500);
      res.send("some error occured");
    }
  }
);

//authenticate user using POST"/api/auth/login" doesn't require auth
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors, return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //destructuring method of js
    const { email, password } = req.body;
    try {
      //trying to find user in db
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "Wrong mail" });
      }
      //comparing bcrypt passwords (ie the one entered and the one in the db)
      //returns a boolean
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Wrong password" });
      }
      //if both are correct
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_sec);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500);
      res.send("internal error occured");
    }
  }
);

//Get loggein user details using POST"/api/auth/getuser" Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500);
    res.send("internal error ");
  }
});

//Get loggein user details using POST"/api/auth/updateuser" Login required
router.put(
  "/updateuser",
  fetchuser,
  [
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if there are errors, return bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      const newUser = {};
      if (username) {
        newUser.username = username;
      }
      if (password) {
        newUser.password = secPass;
      }

      const userId = req.user.id;
      let user = await User.findById(userId);
      user = await User.findByIdAndUpdate(
        userId,
        { $set: newUser },
        { new: true }
      );

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_sec);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500);
      res.send("internal error ");
    }
  }
);

//Get loggein user details using DELETE"/api/auth/deleteuser" Login required
router.delete("/deleteuser", fetchuser, async (req, res) => {
  let success = false;
  //if there are errors, return bad req and errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);
    user = await User.findByIdAndDelete(userId);
    res.json({ success: "user has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500);
    res.send("internal error ");
  }
});
module.exports = router;
