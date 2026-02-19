import { env } from './env';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export const apiClient = async <TResponse>(
  path: string,
  options?: {
    method?: HttpMethod;
    body?: unknown;
    token?: string;
  }
): Promise<TResponse> => {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    method: options?.method ?? 'GET',
    headers: {
      'content-type': 'application/json',
      ...(options?.token ? { authorization: `Bearer ${options.token}` } : {})
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: 'no-store'
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(payload.message ?? 'Request failed');
  }

  return response.json() as Promise<TResponse>;
};
