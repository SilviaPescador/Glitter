<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container container-fluid justify-content-between">
      <!-- Left elements -->
      <div class="d-flex">
        <!-- Glitter logo -->
        <router-link
          to="/landing-page"
          class="navbar-brand me-2 mb-1 d-flex align-items-center"
        >
          <img
            src="../assets/img/logo_navbar.svg"
            height="35"
            alt="Glitter Logo"
            loading="lazy"
            style="margin-top: 2px"
          />
        </router-link>

        <!-- Search -->
        <form
          class="input-group w-auto my-auto d-none d-sm-flex"
          @submit.prevent="search"
        >
          <div class="form-outline">
            <input
              type="text"
              class="form-control"
              placeholder="Search glits..."
              v-model="searchTerm"
              @keyup="$emit('updateSearch', searchTerm)"
            />
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-form"
            @click="$emit('updateSearch', searchTerm)"
          >
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
      <!-- End left elements -->

      <!-- Right elements -->
      <ul class="navbar-nav flex-row">
        <li class="nav-item me-3 me-lg-1 active" v-if="checkLogout(true)">
          <router-link to="/" class="nav-link" aria-current="page">
            <span><i class="fas fa-home fa-lg"></i></span>
          </router-link>
        </li>
        <li class="nav-item me-3 me-lg-1 active" v-if="checkLogin(true)">
          <router-link to="/private" class="nav-link" aria-current="page">
            <span><i class="fa-solid fa-comments fa-lg"></i></span>
          </router-link>
        </li>
        <li class="nav-item me-3 me-lg-1 active">
          <router-link to="/public" class="nav-link" aria-current="page">
            <span><i class="fas fa-users fa-lg"></i></span>
          </router-link>
        </li>
        <li class="nav-item me-3 me-lg-1 active" v-if="checkLogin(true)">
          <router-link to="/user-profile" class="nav-link" aria-current="page">
            <span><i class="fa-solid fa-user fa-lg"></i></span>
          </router-link>
        </li>
        <li class="nav-item me-3 me-lg-1 active" v-if="checkLogin(true)">
          <span>
            <LogoutButton />
          </span>
        </li>
      </ul>
      <!-- Right elements -->
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import glitterApi from "../api/glitterApi";
import LogoutButton from "./LogoutButton.vue";

export default {
  name: "NavBar",
  components: {
    LogoutButton,
  },
  props: ["modelValue"],

  setup(props) {
    const searchTerm = ref(props.modelValue);
    const router = useRouter();
    const store = useStore();

    // Computed properties reactivas basadas en Vuex
    const isAuthenticated = computed(
      () => store.getters["auth/isAuthenticated"]
    );
    const currentUser = computed(() => store.getters["auth/currentUser"]);

    // Búsqueda de glits
    const search = async () => {
      // Validar que hay término de búsqueda
      if (!searchTerm.value || searchTerm.value.trim() === "") {
        store.dispatch(
          "notifications/warning",
          "Por favor, escribe algo para buscar"
        );
        return;
      }

      try {
        // Indicar que estamos buscando
        store.dispatch("search/setSearching", true);

        // Hacer la petición al backend
        const response = await glitterApi.get(
          `/glits?search=${searchTerm.value.trim()}`
        );

        const results = response.data.docs;

        // Guardar resultados en el store
        store.dispatch("search/setSearchResults", {
          term: searchTerm.value.trim(),
          results: results,
        });

        // Indicar que terminamos de buscar
        store.dispatch("search/setSearching", false);

        // Siempre redirigir a /public para mostrar resultados (o vacío)
        if (results.length > 0) {
          // Mostrar notificación de éxito
          store.dispatch(
            "notifications/success",
            `Se encontraron ${results.length} resultado${
              results.length > 1 ? "s" : ""
            }`
          );
        } else {
          // No hay resultados - pero igual guardamos la búsqueda
          store.dispatch(
            "notifications/info",
            `No se encontraron resultados para "${searchTerm.value}"`
          );
        }

        // ✅ MEJORADO: Redirigir inteligentemente
        const currentPath = router.currentRoute.value.path;

        // Si está autenticado, ir a public-plus, si no, a public
        // Pero siempre con el query parameter fromSearch para que el guard lo permita
        const targetPath = isAuthenticated.value ? "/public-plus" : "/public";

        if (currentPath === targetPath) {
          console.log(
            `🔄 Ya estamos en ${targetPath}, forzando actualización...`
          );
          // Ya estamos en la ruta correcta, solo necesitamos que el watch detecte el cambio
          // El watch de searchResults ya se encargará de actualizar
        } else {
          console.log(`➡️ Redirigiendo a ${targetPath} con búsqueda...`);
          router.push({
            path: targetPath,
            query: { fromSearch: "true" }, // Indicar que viene de búsqueda
          });
        }

        // Limpiar el campo de búsqueda
        searchTerm.value = "";
      } catch (error) {
        console.error("Error en búsqueda:", error);
        store.dispatch("search/setSearching", false);
        store.dispatch(
          "notifications/error",
          "Error al realizar la búsqueda. Intenta de nuevo"
        );
      }
    };

    // Funciones reactivas que usan el computed
    const checkLogin = () => isAuthenticated.value;
    const checkLogout = () => !isAuthenticated.value;

    return {
      searchTerm,
      search,
      checkLogin,
      checkLogout,
      isAuthenticated, // Exponer para usar en template si es necesario
      currentUser, // Exponer info del usuario
    };
  },
};
</script>

<style scoped>
.material-icons {
  color: white;
  font-size: 1.4em;
  background-color: #a0c3d2;
  padding: 0.3em;
  border-radius: 50%;
  margin: 0.1em;
}

.input-group {
  max-width: 20em;
}

.container {
  max-width: 855px;
}

.btn-form {
  line-height: 5pt;
  padding: 0 20px;
  background: #95a4ff;
  letter-spacing: 2px;
  transition: 0.2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #ffa580, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}

input.form-control {
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #ffa580, 3px 3px 1px 2px rgba(0, 0, 0, 1);
  background: #f8f4e5;
}

.navbar {
  background-color: #95a4ff;
  border-bottom: 1px solid rgba(0, 0, 0, 1);
}
</style>
