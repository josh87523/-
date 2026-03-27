import { api } from './client';
import type { Task } from '../types';

export interface TaskCreate {
  fromAgentId: string;
  toAgentId: string;
  title: string;
  description?: string;
}

export async function getTasks(agentId: string) {
  return api.get<{ tasks: Task[]; total: number }>(`/tasks?agentId=${agentId}`);
}

export async function getTaskDetail(taskId: string) {
  return api.get<Task>(`/tasks/${taskId}`);
}

export async function createTask(data: TaskCreate) {
  return api.post<Task>('/tasks', data);
}

export async function updateTask(taskId: string, data: Partial<Task>) {
  return api.put<Task>(`/tasks/${taskId}`, data);
}
