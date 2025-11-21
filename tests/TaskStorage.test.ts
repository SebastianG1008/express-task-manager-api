import { TaskStorage } from "../src/storage/TaskStorage"
import type { Task } from "../src/models/Task"

describe("TaskStorage", () => {
  let storage: TaskStorage

  beforeEach(() => {
    storage = new TaskStorage()
  })

  describe("create", () => {
    it("should create a task with auto-incremented id", () => {
      const task = storage.create({ title: "Test", completed: false })

      expect(task.id).toBe(1)
      expect(task.title).toBe("Test")
      expect(task.completed).toBe(false)
    })

    it("should increment id for each new task", () => {
      const task1 = storage.create({ title: "Task 1", completed: false })
      const task2 = storage.create({ title: "Task 2", completed: false })

      expect(task1.id).toBe(1)
      expect(task2.id).toBe(2)
    })
  })

  describe("getAll", () => {
    it("should return empty array initially", () => {
      expect(storage.getAll()).toEqual([])
    })

    it("should return all tasks", () => {
      storage.create({ title: "Task 1", completed: false })
      storage.create({ title: "Task 2", completed: true })

      const tasks = storage.getAll()
      expect(tasks.length).toBe(2)
    })
  })

  describe("getById", () => {
    it("should return task by id", () => {
      const created = storage.create({ title: "Test", completed: false })
      const found = storage.getById(created.id)

      expect(found).toEqual(created)
    })

    it("should return undefined for non-existent id", () => {
      expect(storage.getById(999)).toBeUndefined()
    })
  })

  describe("update", () => {
    it("should update existing task", () => {
      const task = storage.create({ title: "Original", completed: false })
      const updated: Task = { ...task, title: "Updated", completed: true }

      const result = storage.update(task.id, updated)

      expect(result).toEqual(updated)
      expect(storage.getById(task.id)).toEqual(updated)
    })

    it("should return undefined for non-existent task", () => {
      const result = storage.update(999, { id: 999, title: "Test", completed: false })

      expect(result).toBeUndefined()
    })
  })

  describe("delete", () => {
    it("should delete existing task", () => {
      const task = storage.create({ title: "Test", completed: false })

      const result = storage.delete(task.id)

      expect(result).toBe(true)
      expect(storage.getById(task.id)).toBeUndefined()
    })

    it("should return false for non-existent task", () => {
      expect(storage.delete(999)).toBe(false)
    })
  })

  describe("clear", () => {
    it("should remove all tasks", () => {
      storage.create({ title: "Task 1", completed: false })
      storage.create({ title: "Task 2", completed: false })

      storage.clear()

      expect(storage.getAll()).toEqual([])
      expect(storage.count()).toBe(0)
    })

    it("should reset id counter", () => {
      storage.create({ title: "Task 1", completed: false })
      storage.clear()

      const task = storage.create({ title: "Task 2", completed: false })

      expect(task.id).toBe(1)
    })
  })

  describe("count", () => {
    it("should return 0 initially", () => {
      expect(storage.count()).toBe(0)
    })

    it("should return correct count", () => {
      storage.create({ title: "Task 1", completed: false })
      storage.create({ title: "Task 2", completed: false })

      expect(storage.count()).toBe(2)
    })

    it("should update count after deletion", () => {
      const task = storage.create({ title: "Task", completed: false })
      storage.delete(task.id)

      expect(storage.count()).toBe(0)
    })
  })
})
