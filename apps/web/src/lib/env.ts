const getEnv = (key: 'NEXT_PUBLIC_API_BASE_URL' | 'NEXT_PUBLIC_WS_URL', fallback: string) => {
  const value = process.env[key];
  return value && value.length > 0 ? value : fallback;
};

export const env = {
  apiBaseUrl: getEnv('NEXT_PUBLIC_API_BASE_URL', 'http://localhost:5001/v1'),
  wsUrl: getEnv('NEXT_PUBLIC_WS_URL', 'http://localhost:5001')
};
