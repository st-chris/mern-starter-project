export const isTokenExpired = (token: string): boolean => {
  if (!token) return true; // If no token is provided, consider it expired

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // If there's an error, assume token is expired
  }
};
