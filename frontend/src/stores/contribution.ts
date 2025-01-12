import { defineStore } from 'pinia';
import { contributionService, type CreateContributionData } from '@/services/contribution.service';
import type { Contribution } from '@/types';

interface ContributionState {
  contributions: Record<number, Contribution[]>;
  loading: boolean;
  error: string | null;
}

export const useContributionStore = defineStore('contribution', {
  state: (): ContributionState => ({
    contributions: {},
    loading: false,
    error: null
  }),

  actions: {
    async fetchProjectContributions(projectId: number) {
      try {
        this.loading = true;
        const contributions = await contributionService.getProjectContributions(projectId);
        this.contributions[projectId] = contributions;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createContribution(data: CreateContributionData) {
      try {
        this.loading = true;
        const contribution = await contributionService.create(data);
        if (!this.contributions[data.projectId]) {
          this.contributions[data.projectId] = [];
        }
        this.contributions[data.projectId].push(contribution);
        return contribution;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});
