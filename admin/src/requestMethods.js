import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWI0OWQ4NmJiN2QyOGE5NWVkZmNmZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzU3ODQ0NSwiZXhwIjoxNjU3ODM3NjQ1fQ.WnEGxdBaW77b88sPFy5sqG9hM9TR2IZZrlibye4tN5g";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
