export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: 'employer' | 'seeker';
  company_name?: string;
  phone?: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}
