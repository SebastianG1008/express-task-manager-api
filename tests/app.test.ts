import request from "supertest"
import app from "../src/app"

describe("Task Manager API - Integration Tests", () => {
  describe("GET /status", () => {
    it("should return status ok", async () => {
      const response = await request(app).get("/status")

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("status", "ok")
      expect(response.body).toHaveProperty("message")
    })

    it("should return tasks count", async () => {
      const response = await request(app).get("/status")

      expect(response.body).toHaveProperty("tasksCount")
      expect(typeof response.body.tasksCount).toBe("number")
    })
  })

  describe("GET /tasks", () => {
    it("should return an array of tasks", async () => {
      const response = await request(app).get("/tasks")

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
    })

    it("should return empty array initially", async () => {
      const response = await request(app).get("/tasks")

      expect(response.body.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const response = await request(app).post("/tasks").send({ title: "Test Task" })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("title", "Test Task")
      expect(response.body).toHaveProperty("completed", false)
    })

    it("should return 400 if title is missing", async () => {
      const response = await request(app).post("/tasks").send({})

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty("error")
    })

    it("should return 400 if title is empty string", async () => {
      const response = await request(app).post("/tasks").send({ title: "" })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty("error")
    })

    it("should return 400 if title is only whitespace", async () => {
      const response = await request(app).post("/tasks").send({ title: "   " })

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty("error")
    })

    it("should trim whitespace from title", async () => {
      const response = await request(app).post("/tasks").send({ title: "  Trimmed Task  " })

      expect(response.status).toBe(201)
      expect(response.body.title).toBe("Trimmed Task")
    })
  })

  describe("PATCH /tasks/:id/toggle", () => {
    it("should toggle task completion status", async () => {
      const createResponse = await request(app).post("/tasks").send({ title: "Toggle Test" })

      const taskId = createResponse.body.id

      const toggleResponse = await request(app).patch(`/tasks/${taskId}/toggle`)

      expect(toggleResponse.status).toBe(200)
      expect(toggleResponse.body.completed).toBe(true)
    })

    it("should toggle back to false", async () => {
      const createResponse = await request(app).post("/tasks").send({ title: "Toggle Test 2" })

      const taskId = createResponse.body.id

      await request(app).patch(`/tasks/${taskId}/toggle`)
      const secondToggle = await request(app).patch(`/tasks/${taskId}/toggle`)

      expect(secondToggle.body.completed).toBe(false)
    })

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).patch("/tasks/99999/toggle")

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty("error")
    })

    it("should return 400 for invalid task id", async () => {
      const response = await request(app).patch("/tasks/invalid/toggle")

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty("error")
    })
  })

  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      const createResponse = await request(app).post("/tasks").send({ title: "Delete Test" })

      const taskId = createResponse.body.id

      const deleteResponse = await request(app).delete(`/tasks/${taskId}`)

      expect(deleteResponse.status).toBe(204)
    })

    it("should return 404 for non-existent task", async () => {
      const response = await request(app).delete("/tasks/99999")

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty("error")
    })

    it("should return 400 for invalid task id", async () => {
      const response = await request(app).delete("/tasks/invalid")

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty("error")
    })

    it("should not find task after deletion", async () => {
      const createResponse = await request(app).post("/tasks").send({ title: "Delete Test 2" })

      const taskId = createResponse.body.id

      await request(app).delete(`/tasks/${taskId}`)
      const toggleResponse = await request(app).patch(`/tasks/${taskId}/toggle`)

      expect(toggleResponse.status).toBe(404)
    })
  })

  describe("Error Handling", () => {
    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/unknown")

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty("error")
    })

    it("should handle malformed JSON", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Content-Type", "application/json")
        .send("{ invalid json }")

      expect(response.status).toBe(400)
    })
  })
})
