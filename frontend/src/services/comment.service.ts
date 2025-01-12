import apiClient from './api.service';
import type { Comment } from '@/types';

export interface CreateCommentData {
  projectId: number;
  content: string;
  parentId?: number;
}

export const commentService = {
  async create(data: CreateCommentData) {
    const response = await apiClient.post<Comment>('/comments', data);
    return response.data;
  },

  async getProjectComments(projectId: number) {
    const response = await apiClient.get<Comment[]>(`/comments/project/${projectId}`);
    return response.data;
  }
};
