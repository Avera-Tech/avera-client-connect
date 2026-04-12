// ─────────────────────────────────────────────────────────────────────────────
// src/services/httpClient.ts
//
// Client HTTP base — token automático, timeout, sanitização e logout em 401/403
// Todos os services importam `request` e `adminToken` daqui.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL          = import.meta.env.VITE_API_URL ?? 'http://localhost:3100';
const TOKEN_KEY         = 'avera_admin_token';
const REQUEST_TIMEOUT_MS = 10_000;

// ─── Token helpers ────────────────────────────────────────────────────────────

export const adminToken = {
  get: (): string | null => {
    try { return localStorage.getItem(TOKEN_KEY); }
    catch { return null; }
  },
  set: (token: string): void => {
    try { localStorage.setItem(TOKEN_KEY, token); }
    catch { console.error('[adminToken] Não foi possível salvar o token.'); }
  },
  remove: (): void => {
    try { localStorage.removeItem(TOKEN_KEY); }
    catch { /* silently ignore */ }
  },
};

// ─── Sanitize — remove tags HTML para evitar XSS ─────────────────────────────

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

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body } = options;
  const token = adminToken.get();

  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      signal: controller.signal,
      body:   body ? JSON.stringify(sanitize(body)) : undefined,
    });

    if (response.status === 401 || response.status === 403) {
      adminToken.remove();
      window.location.href = '/admin/login';
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