import  express from 'express';
import { ProjectController } from './project.controller';


const router = express.Router()

router.post("/", ProjectController.createProject)
router.get("/", ProjectController.getAllProject)
router.get("/:id", ProjectController.getProjectById)
router.patch("/:id", ProjectController.updateProject)
router.delete("/:id", ProjectController.deleteProject)

export const ProjectRouter = router