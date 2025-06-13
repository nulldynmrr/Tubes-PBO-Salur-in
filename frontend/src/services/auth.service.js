export const authService = {
  login: async (name, password) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    if (!res.ok) throw new Error("Login gagal");
    return res.json();
  },
  setAuthToken: (token) => {
    document.cookie = `auth_token=${token}; path=/; Secure`;
  },
};
