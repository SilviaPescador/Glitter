<template>
  <div class="glits-container">
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <div class="mt-2">
        <!-- Mostrar si hay búsqueda activa -->
        <header v-if="!hasSearchResults">Explore</header>
        <div v-else class="search-results-header">
          <h3>Resultados de búsqueda: "{{ searchTerm }}"</h3>
          <button class="btn-clear-search" @click="clearSearch">
            <i class="fas fa-times"></i> Limpiar búsqueda
          </button>
        </div>

        <div class="search-bar d-flex justify-content-end">
          <Toggle
            v-model="currentOrder"
            class="toggle-blue"
            :falseValue="'desc'"
            :trueValue="'asc'"
            :offLabel="'Descending'"
            :onLabel="'Ascending'"
          />
        </div>

        <!-- ✅ NUEVO: Mensaje cuando no hay glits -->
        <div v-if="glits.length === 0" class="no-results-message">
          <i class="fas fa-search fa-3x"></i>
          <p v-if="hasSearchResults">
            No se encontraron publicaciones para "{{ searchTerm }}"
          </p>
          <p v-else>No hay publicaciones disponibles</p>
        </div>

        <!-- Lista de glits -->
        <GlitItem
          v-for="glit in glits"
          :key="glit._id"
          :author="glit.author.username"
          :publishDate="glit.publishDate"
          :text="glit.text"
          :glit="glit"
          :kudos="glit.kudos"
          :likeName="likeName"
          :imagePath="glit.imagePath"
        />
      </div>

      <footer class="text-center">
        <p class="mb-3">
          Don't miss what's happening! Users on Glitter are the first to know.
        </p>

        <router-link
          router-link
          to="/signup"
          class="nav-link active mb-3"
          aria-current="page"
        >
          <button class="btn-see-more btn btn-secondary" type="button">
            Sign up now to see more
          </button>

          <!-- Paginator -->
          <div class="paginator">
            <vue-awesome-paginate
              :total-items="glits.length"
              :items-per-page="glits.limit"
              v-model="currentPage"
            >
              <template #prev-button>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                  </svg>
                </span>
              </template>

              <template #next-button>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                  </svg>
                </span>
              </template>
            </vue-awesome-paginate>
          </div>
          <!-- Paginator -->
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
import glitterApi from "../api/glitterApi";
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import GlitItem from "../components/GlitItem.vue";
import Toggle from "@vueform/toggle";

const defaultPage = 1;
const defaultLimit = 7;
const defaultOrder = "desc";

export default {
  name: "PublicView",
  components: {
    GlitItem,
    Toggle,
  },
  setup() {
    const store = useStore();
    const currentPage = ref(defaultPage);
    const currentOrder = ref(defaultOrder);
    const glits = ref([]);
    const glit = ref("");

    const likeName = "kudos";

    const hasSearchResults = computed(
      () => store.getters["search/hasSearched"]
    );
    const searchResults = computed(() => store.getters["search/searchResults"]);
    const searchTerm = computed(() => store.getters["search/searchTerm"]);

    // ✅ MEJORADO: Función para obtener glits (búsqueda o normal)
    const getGlits = async (page, limit, order) => {
      console.log("🔍 getGlits llamado:", {
        hasSearch: hasSearchResults.value,
        resultsCount: searchResults.value.length,
      });

      // Si hay búsqueda activa, mostrar esos resultados
      if (hasSearchResults.value) {
        console.log(
          "📋 Mostrando resultados de búsqueda:",
          searchResults.value.length
        );
        glits.value = searchResults.value;
        return;
      }

      // Si no hay búsqueda, obtener glits normales
      console.log("📋 Obteniendo glits normales...");
      try {
        const response = await glitterApi.get("/glits", {
          params: {
            page,
            limit,
            order,
          },
        });
        glits.value = response.data.docs;
        console.log("✅ Glits cargados:", glits.value.length);
      } catch (error) {
        console.error("❌ Error al cargar glits:", error);
        store.dispatch("notifications/error", "Error al cargar publicaciones");
      }
    };

    // ✅ MEJORADO: Limpiar búsqueda
    const clearSearch = () => {
      console.log("🧹 Limpiando búsqueda...");
      store.dispatch("search/clearSearch");
      store.dispatch("notifications/info", "Búsqueda limpiada");
      // Forzar recarga de glits normales
      getGlits(currentPage.value, defaultLimit, currentOrder.value);
    };

    onMounted(() => {
      console.log("🚀 PublicView montado");
      getGlits(currentPage.value, defaultLimit, currentOrder.value);
    });

    // ✅ MEJORADO: Watch para detectar cambios en búsqueda
    watch(
      () => searchResults.value,
      (newResults) => {
        console.log("👀 Watch: searchResults cambió:", newResults.length);
        if (hasSearchResults.value) {
          console.log("📋 Actualizando glits con resultados de búsqueda");
          glits.value = newResults;
        }
      },
      { deep: true, immediate: true }
    );

    // ✅ NUEVO: Watch para detectar cuando se limpia la búsqueda
    watch(
      () => hasSearchResults.value,
      (hasSearch, oldHasSearch) => {
        console.log("👀 Watch: hasSearchResults cambió:", hasSearch);
        // Si cambia de true a false (se limpió la búsqueda)
        if (oldHasSearch && !hasSearch) {
          console.log("🧹 Búsqueda limpiada, recargando glits normales...");
          getGlits(currentPage.value, defaultLimit, currentOrder.value);
        }
      }
    );

    watch(
      () => currentPage.value,
      () => {
        // Solo paginar si NO hay búsqueda activa
        if (!hasSearchResults.value) {
          getGlits(currentPage.value, defaultLimit, currentOrder.value);
        }
      }
    );

    watch(
      () => currentOrder.value,
      () => {
        // Solo reordenar si NO hay búsqueda activa
        if (!hasSearchResults.value) {
          getGlits(currentPage.value, defaultLimit, currentOrder.value);
        }
      }
    );

    return {
      glits: glits,
      glit: glit,
      currentPage,
      currentOrder,
      likeName,
      hasSearchResults,
      searchTerm,
      clearSearch,
    };
  },
};
</script>

<style>
@import "@vueform/toggle/themes/default.css";

header {
  text-shadow: 3px 3px #95a4ff;
  -webkit-text-stroke: 1px rgba(0, 0, 0);
  padding: 10px;
  font-size: 40px;
  font-weight: bold;
  color: #ffa580;
  letter-spacing: 2px;
}

/* Estilos para header de búsqueda */
.search-results-header {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f4e5;
  border-radius: 12px;
  border: 2px solid rgba(0, 0, 0, 1);
  box-shadow: 5px 5px 0 #ffa580;
}

.search-results-header h3 {
  color: #545454;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.btn-clear-search {
  background: #95a4ff;
  color: white;
  border: 2px solid rgba(0, 0, 0, 1);
  padding: 8px 20px;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
}

.btn-clear-search:hover {
  background: #8090ff;
  transform: translateY(-2px);
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
}

.btn-clear-search i {
  margin-right: 5px;
}

/* ✅ NUEVO: Mensaje de sin resultados */
.no-results-message {
  text-align: center;
  padding: 60px 20px;
  color: #545454;
}

.no-results-message i {
  color: #95a4ff;
  margin-bottom: 20px;
  opacity: 0.5;
}

.no-results-message p {
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 20px;
}

.btn-see-more {
  line-height: 28pt;
  padding: 0 20px;
  background: #ffa580;
  letter-spacing: 2px;
  transition: 0.2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}

.glits-container {
  margin-top: 1em;
}

.paginator {
  text-align: center;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0rem;
}

.search-bar {
  margin-bottom: 1em;
}

.toggle-blue {
  --toggle-width: 7rem;
  --toggle-height: 1.85rem;
  --toggle-bg-on: #95a4ff;
  --toggle-border-on: #ffa580;
  --toggle-bg-off: #95a4ff;
  --toggle-border-off: #ffa580;
  --toggle-text-on: #ffffff;
  --toggle-text-off: #ffffff;
}

/* 

Paginator

*/

.paginator {
  text-align: center;
  margin-top: 4em;
}

.paginator .paginate-buttons {
  width: 40px;
  height: 40px;
  cursor: pointer;
  background: #ffa580;
  letter-spacing: 2px;
  transition: 0.2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}

.paginator .back-button,
.paginator .next-button {
  margin-inline: 10px;
  border-radius: 25px;
}

.paginator .first-button {
  border-start-start-radius: 25px;
  border-end-start-radius: 25px;
}

.paginator .last-button {
  border-start-end-radius: 25px;
  border-end-end-radius: 25px;
}

.paginator .back-button svg {
  transform: rotate(180deg) translateY(-2px);
}

.paginator .next-button svg {
  transform: translateY(2px);
}

.paginator li:nth-child(2) > .paginate-buttons.number-buttons {
  border-start-start-radius: 25px;
  border-end-start-radius: 25px;
  transition: none;
}

.paginator li:nth-last-child(2) > .paginate-buttons.number-buttons {
  border-start-end-radius: 25px;
  border-end-end-radius: 25px;
}

.paginator .active-page {
  background-color: #99e98e;
  color: f8f4e5;
}

.paginator .active-page {
  background-color: #99e98e;
  color: f8f4e5;
}

.paginator .paginate-buttons:hover {
  background-color: #f8f4e5;
}

.paginator .active-page:hover {
  background-color: #99e98e;
}

.paginator .back-button:active,
.paginator .next-button:active {
  background-color: #e6e6e6;
}

/*

Paginator

*/
</style>
