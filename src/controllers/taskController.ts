import type { Request, Response } from "express"
import type { TaskStorage } from "../storage/TaskStorage"
import { TaskModel, type CreateTaskDTO } from "../models/Task"

export class TaskController {
  private storage: TaskStorage

  constructor(storage: TaskStorage) {
    this.storage = storage
  }

  getStatus = (_req: Request, res: Response): void => {
    res.json({
      status: "ok",
      message: "Task Manager API is running",
      tasksCount: this.storage.count(),
    })
  }

  getAllTasks = (_req: Request, res: Response): void => {
    const tasks = this.storage.getAll()
    res.json(tasks)
  }

  createTask = (req: Request, res: Response): void => {
    const { title } = req.body as CreateTaskDTO

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      res.status(400).json({ error: "Title is required and must be a non-empty string" })
      return
    }

    try {
      const taskData = TaskModel.create(0, title)
      const task = this.storage.create({
        title: taskData.title,
        completed: taskData.completed,
      })
      res.status(201).json(task)
    } catch (error) {
      res.status(400).json({ error: (error as Error).message })
    }
  }

  toggleTask = (req: Request, res: Response): void => {
    const id = Number.parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid task ID" })
      return
    }

    const task = this.storage.getById(id)

    if (!task) {
      res.status(404).json({ error: "Task not found" })
      return
    }

    const updatedTask = TaskModel.toggle(task)
    this.storage.update(id, updatedTask)
    res.json(updatedTask)
  }

  deleteTask = (req: Request, res: Response): void => {
    const id = Number.parseInt(req.params.id)

    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid task ID" })
      return
    }

    const deleted = this.storage.delete(id)

    if (!deleted) {
      res.status(404).json({ error: "Task not found" })
      return
    }

    res.status(204).send()
  }
}
