import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWI0OWQ4NmJiN2QyOGE5NWVkZmNmZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Njk1MjM0NywiZXhwIjoxNjU3MjExNTQ3fQ.9ix6Vg0dwUKc6BdeehHyYNgbmZSopEar-sTyHVdGDf8";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
