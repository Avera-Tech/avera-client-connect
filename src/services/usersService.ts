// ─────────────────────────────────────────────────────────────────────────────
// src/services/usersService.ts
// ─────────────────────────────────────────────────────────────────────────────

import { request } from './httpClient';

export interface AdminUser {
  id:        number;
  name:      string;
  email:     string;
  active:    boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserListResponse {
  success: boolean;
  data:    AdminUser[];
  meta: {
    total:      number;
    page:       number;
    limit:      number;
    totalPages: number;
  };
}

export interface AdminUserResponse {
  success: boolean;
  message: string;
  data:    AdminUser;
}

export interface AdminUserDeleteResponse {
  success: boolean;
  message: string;
}

export interface CreateAdminUserPayload {
  name:     string;
  email:    string;
  password: string;
}

export interface UpdateAdminUserPayload {
  name?:     string;
  email?:    string;
  password?: string;
  active?:   boolean;
}

export interface ListAdminUsersParams {
  page?:   number;
  limit?:  number;
  search?: string;
  active?: boolean;
}

export const adminUsersApi = {
  list: (params: ListAdminUsersParams = {}): Promise<AdminUserListResponse> => {
    const query = new URLSearchParams();
    if (params.page)             query.set('page',   String(params.page));
    if (params.limit)            query.set('limit',  String(params.limit));
    if (params.search)           query.set('search', params.search);
    if (params.active !== undefined) query.set('active', String(params.active));
    const qs = query.toString();
    return request<AdminUserListResponse>(`/admin/users${qs ? `?${qs}` : ''}`);
  },

  getById: (id: number): Promise<AdminUserResponse> =>
    request<AdminUserResponse>(`/admin/users/${id}`),

  create: (payload: CreateAdminUserPayload): Promise<AdminUserResponse> =>
    request<AdminUserResponse>('/admin/users', { method: 'POST', body: payload }),

  update: (id: number, payload: UpdateAdminUserPayload): Promise<AdminUserResponse> =>
    request<AdminUserResponse>(`/admin/users/${id}`, { method: 'PUT', body: payload }),

  remove: (id: number): Promise<AdminUserDeleteResponse> =>
    request<AdminUserDeleteResponse>(`/admin/users/${id}`, { method: 'DELETE' }),
};