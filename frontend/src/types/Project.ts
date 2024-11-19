// src/types/Project.ts
interface Project {
    id: string;
    title: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    creatorId: string;
    endDate: Date;
    category: string;
    images: string[];
    status: 'active' | 'funded' | 'expired';
  }
  
  // src/types/User.ts
  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdProjects?: Project[];
    backedProjects?: Project[];
  }