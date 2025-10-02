import  express from 'express';
import { UserController } from './user.controller';

const router = express.Router()

router.post("/", UserController.createUser)
router.get("/", UserController.getAllUser)
router.get("/:id", UserController.getUserById)
router.patch("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)


export const UserRouter = router