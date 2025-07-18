// src/app/interfaces/api-response.ts
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: number;
  // Ajoutez d'autres champs métier si nécessaire
}