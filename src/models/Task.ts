export interface Task {
  id: number
  title: string
  completed: boolean
}

export interface CreateTaskDTO {
  title: string
}

export class TaskModel {
  static create(id: number, title: string): Task {
    if (!title || title.trim().length === 0) {
      throw new Error("Title is required")
    }

    return {
      id,
      title: title.trim(),
      completed: false,
    }
  }

  static toggle(task: Task): Task {
    return {
      ...task,
      completed: !task.completed,
    }
  }

  static isValid(task: Partial<Task>): boolean {
    return typeof task.title === "string" && task.title.trim().length > 0
  }
}
