// ─────────────────────────────────────────────────────────────────────────────
// src/services/tenantsService.ts
// ─────────────────────────────────────────────────────────────────────────────

import { request } from './httpClient';

export type TenantPlan   = 'starter' | 'professional' | 'enterprise';
export type TenantStatus = 'pending' | 'active' | 'pending_provision' | 'suspended' | 'cancelled';

export interface Tenant {
  id:              number;
  company_name:    string;
  cnpj:            string;
  slug:            string;
  segment:         string;
  city:            string;
  phone:           string | null;
  courts_count:    string;
  plan:            TenantPlan;
  status:          TenantStatus;
  trial_starts_at: string | null;
  trial_ends_at:   string | null;
  db_name:         string | null;
  createdAt:       string;
  updatedAt:       string;
}

export interface TenantListItem {
  id:           number;
  company_name: string;
  cnpj:         string;
  segment:      string;
  city:         string;
  courts_count: string;
  plan:         TenantPlan;
  status:       TenantStatus;
  trial_ends_at: string | null;
  createdAt:    string;
}

export interface TenantFeature {
  feature_name: string;
  enabled:      boolean;
}

export interface TenantAdminUser {
  id:        number;
  name:      string;
  email:     string;
  phone:     string;
  active:    number;
  createdAt: string;
}

export interface TenantDetailResponse {
  success: boolean;
  data: Tenant & {
    admin_user: TenantAdminUser | null;
    features:   TenantFeature[];
  };
}

export interface TenantListResponse {
  success: boolean;
  data:    TenantListItem[];
  meta: {
    total:      number;
    page:       number;
    limit:      number;
    totalPages: number;
  };
}

export interface ListTenantsParams {
  page?:   number;
  limit?:  number;
  search?: string;
  plan?:   TenantPlan;
  status?: TenantStatus;
}

export const adminTenantsApi = {
  list: (params: ListTenantsParams = {}): Promise<TenantListResponse> => {
    const query = new URLSearchParams();
    if (params.page)   query.set('page',   String(params.page));
    if (params.limit)  query.set('limit',  String(params.limit));
    if (params.search) query.set('search', params.search);
    if (params.plan)   query.set('plan',   params.plan);
    if (params.status) query.set('status', params.status);
    const qs = query.toString();
    return request<TenantListResponse>(`/admin/tenants${qs ? `?${qs}` : ''}`);
  },

  getById: (id: number): Promise<TenantDetailResponse> =>
    request<TenantDetailResponse>(`/admin/tenants/${id}`),

  sendInvite: (email: string): Promise<{ success: boolean; message?: string }> =>
    request('/admin/invites', { method: 'POST', body: { email } }),
};