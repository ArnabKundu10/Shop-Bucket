import axios from "axios";
const api = axios.create({
  baseURL: "https://shop-bucket.vercel.app/auth",
});
export const googleAuth = (code) => api.get(`/google?code=${code}`);
