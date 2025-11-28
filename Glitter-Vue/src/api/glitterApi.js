import axios from "axios";
import store from "@/store";

const glitterApi = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor de request con mejor manejo
const setAuthorizationHeader = (config) => {
  // Obtener token del store (más reactivo) o localStorage (fallback)
  const token = store.state.auth.token || localStorage.getItem("access_token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};

glitterApi.interceptors.request.use(setAuthorizationHeader, (error) => {
  console.error("Request error:", error);
  return Promise.reject(error);
});

// Interceptor de response con mejor manejo de errores
glitterApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de autenticación
    if (error.response?.status === 401) {
      console.warn("Unauthorized - clearing auth and redirecting to login");

      // Limpiar autenticación en el store
      store.dispatch("auth/logout");

      // Redirigir a login (solo si no estamos ya allí)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // Manejar otros errores comunes
    if (error.response?.status === 403) {
      store.dispatch(
        "notifications/error",
        "No tienes permisos para realizar esta acción"
      );
    }

    if (error.response?.status === 404) {
      console.error("Resource not found:", error.config.url);
    }

    if (error.response?.status >= 500) {
      store.dispatch(
        "notifications/error",
        "Error del servidor. Por favor, intenta más tarde"
      );
    }

    return Promise.reject(error);
  }
);

export default glitterApi;

/*
 * NOTAS:
 * - Headers contienen información adicional sobre la petición HTTP
 * - El header "Authorization" se usa para incluir información de autenticación
 * - Si no hay token, no se añade el header Authorization
 * - El interceptor de response maneja automáticamente errores 401 (no autenticado)
 */
