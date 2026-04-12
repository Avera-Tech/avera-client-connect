// ─────────────────────────────────────────────────────────────────────────────
// src/services/plansService.ts
// ─────────────────────────────────────────────────────────────────────────────

import { request } from './httpClient';

export type PlanStatus = 'active' | 'inactive';

export interface Plan {
  id:          number;
  name:        string;
  price:       number;
  trial_days:  number;
  description: string | null;
  status:      PlanStatus;
  createdAt:   string;
  updatedAt:   string;
}

export interface PlanListResponse {
  success: boolean;
  data:    Plan[];
  meta: {
    total:      number;
    page:       number;
    limit:      number;
    totalPages: number;
  };
}

export interface PlanResponse {
  success: boolean;
  message: string;
  data:    Plan;
}

export interface PlanDeleteResponse {
  success: boolean;
  message: string;
}

export interface CreatePlanPayload {
  name:         string;
  price:        number;
  trial_days?:  number;
  description?: string;
  status?:      PlanStatus;
}

export interface UpdatePlanPayload {
  name?:        string;
  price?:       number;
  trial_days?:  number;
  description?: string;
  status?:      PlanStatus;
}

export interface ListPlansParams {
  page?:   number;
  limit?:  number;
  search?: string;
  status?: PlanStatus;
}

export const adminPlansApi = {
  list: (params: ListPlansParams = {}): Promise<PlanListResponse> => {
    const query = new URLSearchParams();
    if (params.page)   query.set('page',   String(params.page));
    if (params.limit)  query.set('limit',  String(params.limit));
    if (params.search) query.set('search', params.search);
    if (params.status) query.set('status', params.status);
    const qs = query.toString();
    return request<PlanListResponse>(`/admin/plans${qs ? `?${qs}` : ''}`);
  },

  getById: (id: number): Promise<PlanResponse> =>
    request<PlanResponse>(`/admin/plans/${id}`),

  create: (payload: CreatePlanPayload): Promise<PlanResponse> =>
    request<PlanResponse>('/admin/plans', { method: 'POST', body: payload }),

  update: (id: number, payload: UpdatePlanPayload): Promise<PlanResponse> =>
    request<PlanResponse>(`/admin/plans/${id}`, { method: 'PUT', body: payload }),

  remove: (id: number): Promise<PlanDeleteResponse> =>
    request<PlanDeleteResponse>(`/admin/plans/${id}`, { method: 'DELETE' }),
};