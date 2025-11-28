import store from "@/store";

// Guard usando Vuex store
const guard = async function () {
  // Verificar si hay token en el store
  const isAuthenticated = store.getters["auth/isAuthenticated"];

  if (!isAuthenticated) {
    console.log("🚫 Guard: No hay token de autenticación");
    return false;
  }

  try {
    // Verificar el token con el backend
    const isValid = await store.dispatch("auth/verifyToken");

    if (isValid) {
      console.log("✅ Guard: Token válido - acceso permitido");
      return true;
    } else {
      console.log("❌ Guard: Token inválido - acceso denegado");
      return false;
    }
  } catch (error) {
    console.error("⚠️ Guard: Error al verificar token", error);
    return false;
  }
};

// Guard para rutas privadas
export const useAuthGuard = async (to, from, next) => {
  const authenticated = (await guard()) ?? false;

  if (!authenticated) {
    console.log("🔒 Redirigiendo a login - autenticación requerida");

    // Mostrar notificación
    store.dispatch(
      "notifications/warning",
      "Debes iniciar sesión para acceder a esta página"
    );

    // Redirigir a login con la ruta de destino guardada
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
};

// Guard para zona pública con funcionalidades extra
export const isAuthenticated = async (to, from, next) => {
  const authenticated = await guard();

  if (authenticated) {
    // ✅ MEJORADO: Redirigir a /public-plus EXCEPTO cuando hay búsqueda
    const hasSearchResults = store.getters["search/hasSearched"];

    // Si viene de una búsqueda (from.name es null cuando es navegación programática)
    // o si hay resultados de búsqueda activos, permitir acceso a /public
    if (hasSearchResults || from.query?.fromSearch) {
      console.log("🔍 Búsqueda activa - permitir acceso a /public");
      next(); // Permitir acceso a /public para mostrar resultados
    } else {
      console.log("✨ Usuario autenticado - redirigir a /public-plus");
      next("/public-plus");
    }
  } else {
    console.log("👤 Usuario no autenticado - acceso a /public");
    next();
  }
};
