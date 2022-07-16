import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYWI0OWQ4NmJiN2QyOGE5NWVkZmNmZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NzkxNDA2MiwiZXhwIjoxNjU4MTczMjYyfQ.p5NDgow_ZD9FeBDam857pZFZl37CSxtLO3W5isS2n24";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
