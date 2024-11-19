// src/store/projectStore.ts
import { defineStore } from 'pinia';
import type { Project } from '@/types/Project';
import { api } from '@/services/api';

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    loading: false,
    error: null as string | null,
  }),
  
  actions: {
    async fetchProjects() {
      this.loading = true;
      try {
        const response = await api.get('/projects');
        this.projects = response.data;
      } catch (err) {
        this.error = 'Erreur lors du chargement des projets';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    
    async createProject(project: Omit<Project, 'id'>) {
      try {
        const response = await api.post('/projects', project);
        this.projects.push(response.data);
        return response.data;
      } catch (err) {
        this.error = 'Erreur lors de la création du projet';
        throw err;
      }
    },
  },
  
  getters: {
    featuredProjects: (state) => {
      return state.projects.filter(p => p.status === 'active')
        .sort((a, b) => b.currentAmount - a.currentAmount)
        .slice(0, 6);
    },
  },
});