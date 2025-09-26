// Minimal fetch-based API client for the frontend
const BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function authHeader() {
  try {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (_) {
    return {};
  }
}

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
      ...headers,
    },
    credentials: 'omit',
  };
  if (body !== undefined) {
    opts.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(text || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

export const api = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body }),
  baseURL: BASE_URL,
};
