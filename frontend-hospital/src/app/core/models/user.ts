import { Role } from './role';

export class User {
  id!: number;
  img!: string;
  password!: string;
  first_name!: string;
  last_name!: string;
  role!: Role;
  token!: string;
  access_token?: string;
  address!: string;
  phone!: string;
  cni!: string;
  date_of_birth?: string;
  city_of_birth?: string;
  gender!: string;
  email!: string;
  speciality?: string;
  bio?: string;
  photo?: string;
  matricule?: string;
  hospital_id?: number;
  created_at?: string;
  updated_at?: string;
}
