import { ref, computed } from 'vue';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const TOKEN_STORAGE_KEY = 'textme_auth_token';

const token = ref(typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_STORAGE_KEY) : null);
const user = ref(null);
const loading = ref(false);
const error = ref(null);

const setSession = ({ token: nextToken, user: nextUser }) => {
  token.value = nextToken;
  user.value = nextUser;
  if (nextToken) {
    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

const request = async (path, { method = 'GET', body } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token.value) {
    headers.Authorization = `Bearer ${token.value}`;
  }
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    const message = await response.json().catch(() => ({}));
    throw new Error(message?.message || 'Request failed');
  }
  return response.json();
};

const fetchMe = async () => {
  if (!token.value) return;
  try {
    loading.value = true;
    const data = await request('/auth/me');
    user.value = data.user;
  } catch (err) {
    console.error('Auth me error', err);
    setSession({ token: null, user: null });
  } finally {
    loading.value = false;
  }
};

if (token.value) {
  fetchMe();
}

const login = async (credentials) => {
  loading.value = true;
  error.value = null;
  try {
    const data = await request('/auth/login', { method: 'POST', body: credentials });
    setSession(data);
    return data;
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    loading.value = false;
  }
};

const register = async (payload) => {
  loading.value = true;
  error.value = null;
  try {
    const data = await request('/auth/register', { method: 'POST', body: payload });
    setSession(data);
    return data;
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    loading.value = false;
  }
};

const loginWithGoogle = async (credential) => {
  if (!credential) throw new Error('Missing Google credential');
  loading.value = true;
  error.value = null;
  try {
    const data = await request('/auth/google', { method: 'POST', body: { credential } });
    setSession(data);
    return data;
  } catch (err) {
    error.value = err.message;
    throw err;
  } finally {
    loading.value = false;
  }
};

const logout = () => {
  setSession({ token: null, user: null });
  error.value = null;
};

export const isAuthenticated = computed(() => Boolean(user.value && token.value));

export function useAuth() {
  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    fetchMe,
  };
}

export { token as authTokenRef, user as authUserRef };

