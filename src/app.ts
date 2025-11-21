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

// Type guard: verifica si el error tiene una propiedad "body"
function hasBodyProperty(err: unknown): err is { body: unknown } {
  return typeof err === "object" && err !== null && "body" in err
}

// Manejo de JSON malformado
app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && hasBodyProperty(err)) {
    return res.status(400).json({ error: "Invalid JSON" })
  }
  return next(err)
})

// Manejador general de errores
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  return res.status(500).json({ error: "Internal server error" })
})

export default app
