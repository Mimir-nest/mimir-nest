import express from "express";
import { contentController } from "../controllers/contentController.js";
export const contentRoutes = express.Router();
contentRoutes.get("/projects", contentController.getProjects);
contentRoutes.get("/courses", contentController.getCourses);
contentRoutes.get("/perks", contentController.getPerks);
contentRoutes.get("/placement", contentController.getPlacement);
contentRoutes.get("/roadmaps", contentController.getRoadmaps);
