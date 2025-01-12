import apiClient from './api.service';
import type { Project } from '@/types';

export interface CreateProjectData {
  title: string;
  description: string;
  goal: number;
  endDate: Date;
  category: string;
  imageUrl?: string;
}

export const projectService = {
  async create(data: CreateProjectData) {
    const response = await apiClient.post<Project>('/projects', data);
    return response.data;
  },

  async getAll() {
    const response = await apiClient.get<Project[]>('/projects');
    return response.data;
  },

  async getById(id: number) {
    const response = await apiClient.get<Project>(`/projects/${id}`);
    return response.data;
  },

  async update(id: number, data: Partial<CreateProjectData>) {
    const response = await apiClient.put<Project>(`/projects/${id}`, data);
    return response.data;
  },

  async delete(id: number) {
    await apiClient.delete(`/projects/${id}`);
  },

  async getByCreator(creatorId: number) {
    const response = await apiClient.get<Project[]>(`/projects/creator/${creatorId}`);
    return response.data;
  }
};
