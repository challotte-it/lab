import { taskRepository, type Task } from "./taskRepository";

export async function getTasks(): Promise<Task[]> {
  return taskRepository.getAll();
}
