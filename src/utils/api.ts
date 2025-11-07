export const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : '';

export async function apiFetch(path: string, options?: RequestInit) {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, options);
  return res;
}
