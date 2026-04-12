// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useAdminPlans.ts
// ─────────────────────────────────────────────────────────────────────────────

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  adminPlansApi,
  type CreatePlanPayload,
  type UpdatePlanPayload,
  type ListPlansParams,
} from '@/services/plansService';

const QUERY_KEY = 'admin-plans';

// ─── Listagem ─────────────────────────────────────────────────────────────────

export function useAdminPlans(params: ListPlansParams = {}) {
  const { search, limit, status } = params;

  return useQuery({
    queryKey: [QUERY_KEY, { search, limit, status }],
    queryFn:  () => adminPlansApi.list(params),
    staleTime: 30_000,
    retry: (error: unknown) => {
      const msg = error instanceof Error ? error.message : '';
      if (msg.includes('401') || msg.includes('403') || msg.includes('Sessão')) return false;
    },
  });
}

// ─── Criação ──────────────────────────────────────────────────────────────────

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePlanPayload) => adminPlansApi.create(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success(res.message);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Erro ao criar plano.');
    },
  });
}

// ─── Edição ───────────────────────────────────────────────────────────────────

export function useUpdatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePlanPayload }) =>
      adminPlansApi.update(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success(res.message);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Erro ao atualizar plano.');
    },
  });
}

// ─── Exclusão ─────────────────────────────────────────────────────────────────

export function useDeletePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminPlansApi.remove(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success(res.message);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Erro ao excluir plano.');
    },
  });
}