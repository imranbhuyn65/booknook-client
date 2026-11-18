import axios from "axios";
import { authClient } from "@/lib/auth-client";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({ baseURL });

// Get a JWT for the logged-in user (cached in localStorage).
// If the token is not there yet (e.g. page opened right after login),
// ask the server for one so the first API call does not fail with 401.
async function getToken() {
  let token = localStorage.getItem("booknook-token");
  if (token) return token;

  try {
    const { data } = await authClient.getSession();
    const email = data?.user?.email;
    if (!email) return null;

    const res = await axios.post(`${baseURL}/jwt`, { email });
    token = res.data.token;
    localStorage.setItem("booknook-token", token);
    return token;
  } catch {
    return null;
  }
}

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// If the token is expired/invalid, drop it so a fresh one is fetched next time
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (typeof window !== "undefined" && [401, 403].includes(err.response?.status)) {
      localStorage.removeItem("booknook-token");
    }
    return Promise.reject(err);
  }
);

export default api;
