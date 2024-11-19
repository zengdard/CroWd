// backend/src/utils/ApiError.ts
export class ApiError extends Error {
    constructor(
      public statusCode: number,
      public message: string,
      public details?: any
    ) {
      super(message);
      this.name = 'ApiError';
    }
  }