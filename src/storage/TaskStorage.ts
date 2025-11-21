import type { Task } from "../models/Task"

export class TaskStorage {
  private tasks: Map<number, Task>
  private nextId: number

  constructor() {
    this.tasks = new Map()
    this.nextId = 1
  }

  getAll(): Task[] {
    return Array.from(this.tasks.values())
  }

  getById(id: number): Task | undefined {
    return this.tasks.get(id)
  }

  create(task: Omit<Task, "id">): Task {
    const newTask: Task = {
      ...task,
      id: this.nextId++,
    }
    this.tasks.set(newTask.id, newTask)
    return newTask
  }

  update(id: number, task: Task): Task | undefined {
    if (!this.tasks.has(id)) {
      return undefined
    }
    this.tasks.set(id, task)
    return task
  }

  delete(id: number): boolean {
    return this.tasks.delete(id)
  }

  clear(): void {
    this.tasks.clear()
    this.nextId = 1
  }

  count(): number {
    return this.tasks.size
  }
}
