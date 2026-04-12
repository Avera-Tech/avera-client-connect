// ─────────────────────────────────────────────────────────────────────────────
// src/services/authService.ts
// ─────────────────────────────────────────────────────────────────────────────

import { request } from './httpClient';
import { AdminUser } from './usersService';

export interface AdminLoginPayload {
  email:    string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token:   string;
  user: {
    id:    number;
    name:  string;
    email: string;
    role:  string;
  };
}

export const adminAuthApi = {
  login: (payload: AdminLoginPayload): Promise<AdminLoginResponse> =>
    request<AdminLoginResponse>('/admin/auth/login', { method: 'POST', body: payload }),

  me: (): Promise<{ success: boolean; user: AdminUser }> =>
    request('/admin/auth/me'),
};