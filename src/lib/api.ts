const API_BASE = '/api/v1';

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }
  
  return res.json();
}

export const videoApi = {
  list: (page = 1, pageSize = 20) => api(`/videos?page=${page}&page_size=${pageSize}`),
  get: (id: string) => api(`/videos/${id}`),
  search: (keyword: string, page = 1) => api(`/search?keyword=${encodeURIComponent(keyword)}&page=${page}`),
};

export const userApi = {
  get: (id: string) => api(`/users/${id}`),
  login: (data: any) => api('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

export const commentApi = {
  list: (videoId: string) => api(`/videos/${videoId}/comments`),
  create: (videoId: string, content: string) => api(`/videos/${videoId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ content }),
  }),
};
