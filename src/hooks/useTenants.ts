// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useAdminTenants.ts
// ─────────────────────────────────────────────────────────────────────────────

import { useQuery } from '@tanstack/react-query';
import { adminTenantsApi, type ListTenantsParams } from '@/services/tenantsService';

const QUERY_KEY = 'admin-tenants';

// ─── Listagem ─────────────────────────────────────────────────────────────────

export function useAdminTenants(params: ListTenantsParams = {}) {
  const { search, limit, plan, status, page } = params;

  return useQuery({
    queryKey: [QUERY_KEY, { search, limit, plan, status, page }],
    queryFn:  () => adminTenantsApi.list(params),
    staleTime: 30_000,
    retry: (failureCount, error: unknown) => {
      const msg = error instanceof Error ? error.message : '';
      if (msg.includes('401') || msg.includes('403') || msg.includes('Sessão')) return false;
      return failureCount < 2;
    },
  });
}

// ─── Detalhes ─────────────────────────────────────────────────────────────────

export function useAdminTenant(id: number | null) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn:  () => adminTenantsApi.getById(id!),
    enabled:  id !== null,
    staleTime: 30_000,
  });
}