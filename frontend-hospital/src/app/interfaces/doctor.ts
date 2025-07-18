// src/app/interfaces/doctor.ts
export interface User {
  id?: number;  // Rendons l'id optionnel avec ?
  first_name: string;
  last_name: string;
}

export interface Doctor {
  id: number;
  user: User;  // Ici user doit correspondre à l'interface User
  speciality: string;
  hospital_id: number;
  matricule?: string;
  // ... autres champs
}