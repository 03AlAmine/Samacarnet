import { User } from "@core/models/user";

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}
