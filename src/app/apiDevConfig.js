const devPrefix = process.env.NODE_ENV === 'development' ? "http://localhost:80" : "";

export const API_URL = devPrefix;
