const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5001/v1';

export const adminApi = async <T>(path: string) => {
  const response = await fetch(`${baseUrl}${path}`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Admin API request failed');
  }

  return response.json() as Promise<T>;
};
