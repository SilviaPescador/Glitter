<template>
  <button type="button" class="btn" @click="handleLogout">
    <i class="fa-solid fa-right-from-bracket fa-xl"></i>
  </button>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    // Logout usando Vuex store
    function handleLogout() {
      // Limpiar autenticación en el store (esto también limpia localStorage)
      store.dispatch("auth/logout");

      // Mostrar notificación de despedida
      store.dispatch(
        "notifications/info",
        "¡Hasta pronto! Has cerrado sesión correctamente"
      );

      // Redirigir a la página de inicio
      router.push("/");
    }

    return {
      handleLogout,
    };
  },
};
</script>

<style scoped></style>
