const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Bug = require("../models/Bugs");
const User = require("../models/User");
const Project = require("../models/Project");
const { body, validationResult } = require("express-validator");

//fetching all bugs usin: GET "/api/bugs/fetchallbugs" login reqd
router.get("/:id/fetchallbugs", fetchuser, async (req, res) => {
  let project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).send("Not found");
  }
  const userId = req.user.id;
  let user = await User.findById(userId);
  let projects = user.projects
  if (!projects.includes(project._id)) {
    return res.status(401).send("not allowed");
  }
  const bugs = await Bug.find({ project: project._id });
  res.json(bugs);
});

//adding a  bugs usin: POST "/api/bugs/addbug" login reqd
router.post(
  "/:id/addbug",
  fetchuser,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional(),
    body("priority").notEmpty().withMessage("Priority is required"),
    body("priority")
      .isIn(["High", "Medium", "Low"])
      .withMessage("Priority should be one of High, Medium, Low"),
    body("status").notEmpty().withMessage("Status is required"),
    body("status")
      .isIn(["New", "Assigned", "In Progress", "Testing", "Resolved"])
      .withMessage(
        "Status should be one of New, Assigned, In Progress, Testing, Resolved"
      ),
    body("assignedTo").optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, priority, status, assignedTo } = req.body;
      let project = await Project.findById(req.params.id);

      if (!project) {
        return res.status(404).send("Not found");
      }
      const userId = req.user.id;
      let user = await User.findById(userId);
      if (!user.projects.includes(project._id)) {
        return res.status(401).send("not allowed");
      }
      const bug = new Bug({
        title,
        description,
        priority,
        status,
        assignedTo,
        createdBy: req.user.id,
        project: req.params.id,
      });
      const savedbug = await bug.save();
      res.json(savedbug);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//updating a  bugs using: PUT "/api/bugs/updatebug/:id" login reqd
router.put("/updatebug/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //storing the above things in a newbug
    const newBug = {};
    if (title) {
      newBug.title = title;
    }
    if (description) {
      newBug.description = description;
    }
    if (tag) {
      newBug.tag = tag;
    }
    //finding the bug
    let bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).send("Not found");
    }
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { $set: newBug },
      { new: true }
    );
    res.json({ bug });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//deleting a bugs using: DELETE "/api/bugs/deletebug/:id" login reqd
router.delete("/deletebug/:id", fetchuser, async (req, res) => {
  try {
    //finding the bug
    let bug = await Bug.findById(req.params.id);
    if (!bug) {
      return res.status(404).send("Not found");
    }
    if (bug.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }
    bug = await Bug.findByIdAndDelete(req.params.id);
    res.json({ success: "bug has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
