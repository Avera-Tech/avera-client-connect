// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useAdminUsers.ts
// ─────────────────────────────────────────────────────────────────────────────

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  adminUsersApi,
  type CreateAdminUserPayload,
  type UpdateAdminUserPayload,
  type ListAdminUsersParams,
} from '@/services/adminApi';

const QUERY_KEY = 'admin-users';

// ─── Listagem ─────────────────────────────────────────────────────────────────

export function useAdminUsers(params: ListAdminUsersParams = {}) {
  const { search, limit, active } = params;

  return useQuery({
    queryKey: [QUERY_KEY, { search, limit, active }],
    queryFn:  () => adminUsersApi.list(params),
    staleTime: 30_000,
    retry: (error: unknown) => {
      const msg = error instanceof Error ? error.message : '';
      if (msg.includes('401') || msg.includes('403') || msg.includes('Sessão')) return false;

    },
  });
}

// ─── Detalhes ─────────────────────────────────────────────────────────────────

export function useAdminUser(id: number | null) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn:  () => adminUsersApi.getById(id!),
    enabled:  id !== null,
    staleTime: 30_000,
  });
}

// ─── Criação ──────────────────────────────────────────────────────────────────

export function useCreateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdminUserPayload) => adminUsersApi.create(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success(res.message);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Erro ao criar usuário.');
    },
  });
}

// ─── Edição ───────────────────────────────────────────────────────────────────

export function useUpdateAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateAdminUserPayload }) =>
      adminUsersApi.update(id, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success(res.message);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Erro ao atualizar usuário.');
    },
  });
}

// ─── Exclusão ─────────────────────────────────────────────────────────────────

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => adminUsersApi.remove(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success(res.message);
    },
    onError: (error: Error) => {
      toast.error(error.message ?? 'Erro ao excluir usuário.');
    },
  });
}