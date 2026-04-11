// ─────────────────────────────────────────────────────────────────────────────
// src/services/adminApi.ts
//
// HTTP client para as rotas /admin — com token automático, timeout,
// logout em 401/403 e sanitização de strings.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const TOKEN_KEY = 'avera_admin_token';
const REQUEST_TIMEOUT_MS = 10_000;

// ─── Token helpers ────────────────────────────────────────────────────────────

export const adminToken = {
  get: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token: string): void => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      console.error('[adminToken] Não foi possível salvar o token.');
    }
  },
  remove: (): void => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // silently ignore
    }
  },
};

// ─── Sanitize ────────────────────────────────────────────────────────────────
// Remove tags HTML e normaliza strings para evitar XSS nos campos de texto.

const sanitize = (value: unknown): unknown => {
  if (typeof value === 'string') {
    return value.replace(/<[^>]*>/g, '').trim();
  }
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, sanitize(v)])
    );
  }
  return value;
};

// ─── Core request ─────────────────────────────────────────────────────────────

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body } = options;

  const token = adminToken.get();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      signal: controller.signal,
      body: body ? JSON.stringify(sanitize(body)) : undefined,
    });

    // ── Logout automático em token inválido/expirado ───────────────────────
    if (response.status === 401 || response.status === 403) {
      adminToken.remove();
      window.location.href = '/login';
      throw new Error('Sessão expirada. Faça login novamente.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error ?? `Erro ${response.status}`);
    }

    return data as T;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('A requisição demorou muito. Tente novamente.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserListResponse {
  success: boolean;
  data: AdminUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface AdminUserResponse {
  success: boolean;
  message: string;
  data: AdminUser;
}

export interface AdminUserDeleteResponse {
  success: boolean;
  message: string;
}

export interface CreateAdminUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface UpdateAdminUserPayload {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
}

export interface ListAdminUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  active?: boolean;
}

// ─── Admin Users API ──────────────────────────────────────────────────────────

export const adminUsersApi = {
  list: (params: ListAdminUsersParams = {}): Promise<AdminUserListResponse> => {
    const query = new URLSearchParams();
    if (params.page)   query.set('page',   String(params.page));
    if (params.limit)  query.set('limit',  String(params.limit));
    if (params.search) query.set('search', params.search);
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

// ─── Admin Auth API ───────────────────────────────────────────────────────────

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const adminAuthApi = {
  login: (payload: AdminLoginPayload): Promise<AdminLoginResponse> =>
    request<AdminLoginResponse>('/admin/auth/login', { method: 'POST', body: payload }),

  me: (): Promise<{ success: boolean; user: AdminUser }> =>
    request('/admin/auth/me'),
};