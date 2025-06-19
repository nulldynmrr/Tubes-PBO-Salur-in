export const getToken = () => localStorage.getItem("token");
export const getEmail = () => localStorage.getItem("email");
export const getRole = () => localStorage.getItem("role");

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
};
