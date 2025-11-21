import express, { type Application, type Request, type Response, type NextFunction } from "express"
import taskRoutes from "./routes/tasks"

const app: Application = express()

// Middleware
app.use(express.json())

// Routes
app.use("/", taskRoutes)

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" })
})

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

export default app
