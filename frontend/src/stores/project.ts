import { defineStore } from 'pinia';
import { projectService, type CreateProjectData } from '@/services/project.service';
import type { Project } from '@/types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

export const useProjectStore = defineStore('project', {
  state: (): ProjectState => ({
    projects: [],
    currentProject: null,
    loading: false,
    error: null
  }),

  actions: {
    async fetchProjects() {
      try {
        this.loading = true;
        this.projects = await projectService.getAll();
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchProject(id: number) {
      try {
        this.loading = true;
        this.currentProject = await projectService.getById(id);
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createProject(data: CreateProjectData) {
      try {
        this.loading = true;
        const project = await projectService.create(data);
        this.projects.push(project);
        return project;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getProjectsByCreator(creatorId: number) {
      try {
        this.loading = true;
        const response = await projectService.getByCreator(creatorId);
        return response;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});
