import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWI0OWQ4NmJiN2QyOGE5NWVkZmNmZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjI3NDA5MywiZXhwIjoxNjU2NTMzMjkzfQ.NmL9OCMBJ_fapNsOYzkpGQnhPS-khnhDaP-U0qaMYcE";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
