const TOKEN_KEYNAME = "auth_token";

export const saveAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEYNAME, token);
};

export const getAuthToken = () => localStorage.getItem(TOKEN_KEYNAME);

export const clearAuthToken = () => localStorage.removeItem(TOKEN_KEYNAME);
