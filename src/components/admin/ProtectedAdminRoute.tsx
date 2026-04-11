// ─────────────────────────────────────────────────────────────────────────────
// src/components/admin/ProtectedAdminRoute.tsx
//
// Redireciona para /login se o token não existir.
// Valida também se o token não está corrompido (base64 mal formado).
// ─────────────────────────────────────────────────────────────────────────────

import { Navigate, Outlet } from 'react-router-dom';
import { adminToken } from '@/services/adminApi';

const isTokenStructurallyValid = (token: string | null): boolean => {
  if (!token) return false;
  const parts = token.split('.');

  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(atob(parts[1]));

    if (!payload?.exp) return true;
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const ProtectedAdminRoute = () => {
  const token = adminToken.get();

  if (!isTokenStructurallyValid(token)) {
    adminToken.remove();
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
