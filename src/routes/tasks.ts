import { Router } from "express"
import { TaskController } from "../controllers/taskController"
import { TaskStorage } from "../storage/TaskStorage"

const router = Router()
const storage = new TaskStorage()
const controller = new TaskController(storage)

router.get("/status", controller.getStatus)
router.get("/tasks", controller.getAllTasks)
router.post("/tasks", controller.createTask)
router.patch("/tasks/:id/toggle", controller.toggleTask)
router.delete("/tasks/:id", controller.deleteTask)

export default router
