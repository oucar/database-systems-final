import express from "express";

import {
  getProjects,
  getProjectsBySearch,
  getProjectsByCreator,
  getProject,
  createProject,
  updateProject,
  changelogProject,
  deleteProject,
} from "../controllers/projects.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/creator", getProjectsByCreator);
router.get("/search", getProjectsBySearch);
router.get("/", getProjects);
router.get("/:id", getProject);

router.post("/", auth, createProject);
router.post("/:id/changelogProject", changelogProject);
router.patch("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

export default router;
