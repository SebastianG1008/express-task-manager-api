import { TaskModel } from "../src/models/Task"

describe("TaskModel", () => {
  describe("create", () => {
    it("should create a task with correct properties", () => {
      const task = TaskModel.create(1, "Test Task")

      expect(task.id).toBe(1)
      expect(task.title).toBe("Test Task")
      expect(task.completed).toBe(false)
    })

    it("should trim whitespace from title", () => {
      const task = TaskModel.create(1, "  Trimmed  ")

      expect(task.title).toBe("Trimmed")
    })

    it("should throw error for empty title", () => {
      expect(() => TaskModel.create(1, "")).toThrow("Title is required")
    })

    it("should throw error for whitespace-only title", () => {
      expect(() => TaskModel.create(1, "   ")).toThrow("Title is required")
    })
  })

  describe("toggle", () => {
    it("should toggle completed from false to true", () => {
      const task = { id: 1, title: "Test", completed: false }
      const toggled = TaskModel.toggle(task)

      expect(toggled.completed).toBe(true)
    })

    it("should toggle completed from true to false", () => {
      const task = { id: 1, title: "Test", completed: true }
      const toggled = TaskModel.toggle(task)

      expect(toggled.completed).toBe(false)
    })

    it("should not modify original task", () => {
      const task = { id: 1, title: "Test", completed: false }
      TaskModel.toggle(task)

      expect(task.completed).toBe(false)
    })
  })

  describe("isValid", () => {
    it("should return true for valid task", () => {
      expect(TaskModel.isValid({ title: "Valid Task" })).toBe(true)
    })

    it("should return false for empty title", () => {
      expect(TaskModel.isValid({ title: "" })).toBe(false)
    })

    it("should return false for whitespace-only title", () => {
      expect(TaskModel.isValid({ title: "   " })).toBe(false)
    })

    it("should return false for non-string title", () => {
      expect(TaskModel.isValid({ title: 123 as any })).toBe(false)
    })

    it("should return false for missing title", () => {
      expect(TaskModel.isValid({})).toBe(false)
    })
  })
})
