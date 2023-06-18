import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const glitterApi = axios.create({
  baseURL: "http://localhost:3000",
});

const setAuthorizationHeader = (config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    config.headers["Authorization"] = "";
  }
  return config;
};

glitterApi.interceptors.request.use(setAuthorizationHeader);

glitterApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      // handle unauthorized error
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default glitterApi;

// In this code, headers are an object that contains additional information about the HTTP request being made. In this case, the "Authorization" header is used to include information about the user's authentication.

// If there is no token in the localStorage, the setAuthorizationHeader function does not add an "Authorization" header to the HTTP request. In other words, if there is no token in the localStorage, the HTTP request will not include information about the user's authentication.
