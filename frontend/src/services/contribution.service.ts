import apiClient from './api.service';
import type { Contribution } from '@/types';

export interface CreateContributionData {
  projectId: number;
  amount: number;
  message?: string;
}

export const contributionService = {
  async create(data: CreateContributionData) {
    const response = await apiClient.post<Contribution>('/contributions', data);
    return response.data;
  },

  async getProjectContributions(projectId: number) {
    const response = await apiClient.get<Contribution[]>(`/contributions/project/${projectId}`);
    return response.data;
  }
};
