import express from "express";
import mongoose from "mongoose";

import Project from "../models/project.js";

const router = express.Router();

export const getProjects = async (req, res) => {
  const { page } = req.query;

  try {
    // get the starting index of every page
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Project.countDocuments({});
    const projects = await Project.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: projects,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Main Search component
export const getProjectsBySearch = async (req, res) => {
  const { searchQuery, employees, techStack } = req.query;
  console.log(techStack);
  console.log(employees);

  try {
    const projectName = new RegExp(searchQuery, "i");

    const projects = await Project.find({
      $or: [
        { projectName },
        {
          employees: { $in: employees.split(",") },
        },
        {
          techStack: { $in: techStack.split(",") },
        }
      ],
    });

    res.json({ data: projects });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProjectsByCreator = async (req, res) => {
  const { name } = req.query;

  try {
    const projects = await Project.find({ name });

    res.json({ data: projects });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const project = req.body;

  const newProject = new Project({
    ...project,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  console.log("INFO: " + newProject);

  try {
    await newProject.save();

    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    projectName,
    projectDetails,
    projectManager,
    creator,
    selectedFile,
    employees,
    techStack,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No project with id: ${id}`);

  const updatedProject = {
    creator,
    projectName,
    projectDetails,
    projectManager,
    employees,
    techStack,
    selectedFile,
    _id: id,
  };

  await Project.findByIdAndUpdate(id, updatedProject, { new: true });

  res.json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No project with id: ${id}`);

  await Project.findByIdAndRemove(id);

  res.json({ message: "Project deleted successfully." });
};

export const changelogProject = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const project = await Project.findById(id);

  project.changelogs.push(value);

  const updatedProject = await Project.findByIdAndUpdate(id, project, {
    new: true,
  });

  res.json(updatedProject);
};

export default router;
