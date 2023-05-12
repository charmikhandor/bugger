const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const Project = require("../models/Project");
const { body, validationResult } = require("express-validator");

//fetching all projects usin: GET "/api/projects/fetchallprojects" login reqd
router.get("/fetchallprojects", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById(userId);
    const projects = user.projects;
    const projectDetails = [];
    for (let i = 0; i < projects.length; i++) {
      const project = await Project.findById(projects[i]);
      projectDetails.push(project);
    }
    res.json(projectDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
//adding a  projects usin: POST "/api/projects/addproject" login reqd
router.post(
  "/addproject",
  fetchuser,
  [body("title", "Enter a valid title").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description } = req.body;

      const newProject = new Project({
        title,
        description,
      });
      const project = await newProject.save();
      const userId = req.user.id;
      let user = await User.findById(userId);
      user.projects.push(project._id);
      await user.save();
      res.json(project);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
//updating a  projects using: PUT "/api/projects/updateproject/:id" login reqd
router.put("/updateproject/:id", fetchuser, async (req, res) => {
  const { title, description } = req.body;
  try {
    //storing the above things in a newproject
    const newProject = {};
    if (title) {
      newProject.title = title;
    }
    if (description) {
      newProject.description = description;
    }

    //finding the project
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Not found");
    }
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (!user.projects.includes(project._id)) {
      return res.status(401).send("not allowed");
    }
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: newProject },
      { new: true }
    );

    res.json({ project });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//deleting a projects using: DELETE "/api/projects/deleteproject/:id" login reqd
router.delete("/deleteproject/:id", fetchuser, async (req, res) => {
  try {
    //finding the project
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Not found");
    }
    const userId = req.user.id;
    let user = await User.findById(userId);
    if (!user.projects.includes(project._id)) {
      return res.status(401).send("not allowed");
    }
    // remove the project from the user's project list
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { projects: req.params.id } },
      { new: true }
    );
    project = await Project.findByIdAndDelete(req.params.id);
    res.json({ success: "project has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
