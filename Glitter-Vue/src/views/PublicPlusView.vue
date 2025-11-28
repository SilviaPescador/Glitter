<template>
  <div class="glits-container">
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <div class="mt-2">
        <!-- ✅ NUEVO: Header dinámico para búsqueda -->
        <header v-if="!hasSearchResults">Explore and make new friends!</header>
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

        <GlitItem
          v-for="glit in glits"
          :key="glit._id"
          :btns="btnArray"
          :userId="glit.author._id"
          :author="glit.author.username"
          :publishDate="glit.publishDate"
          :text="glit.text"
          :kudos="glit.kudos"
          :likeName="likeName"
          :glit="glit"
          :imagePath="glit.imagePath"
        />
      </div>

      <!-- Paginator -->
      <div class="paginator">
        <vue-awesome-paginate
          :total-items="totalGlits"
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

      <footer class="text-center">
        <p class="mb-3">Thank you for being part of this awesome community!.</p>
        <router-link
          router-link
          to="/signup"
          class="nav-link active mb-3"
          aria-current="page"
        >
        </router-link>
      </footer>
    </div>
  </div>
</template>

<script>
import glitterApi from "../api/glitterApi";
import { ref, onMounted, watch, computed } from "vue"; // ✅ Añadir computed
import { useStore } from "vuex";
import GlitItem from "../components/GlitItem.vue";
import Toggle from "@vueform/toggle";

const defaultPage = 1;
const defaultLimit = 10;
const defaultOrder = "desc";

export default {
  name: "PublicPlusView",
  components: {
    GlitItem: GlitItem,
    Toggle,
  },

  setup() {
    const store = useStore();
    const currentPage = ref(defaultPage);
    const currentOrder = ref(defaultOrder);
    const glits = ref([]);
    const glit = ref("");
    let totalGlits = ref(0);

    const likeName = "kudos";

    // ✅ NUEVO: Computed properties para búsqueda
    const hasSearchResults = computed(
      () => store.getters["search/hasSearched"]
    );
    const searchResults = computed(() => store.getters["search/searchResults"]);
    const searchTerm = computed(() => store.getters["search/searchTerm"]);

    // ✅ MEJORADO: Función para obtener glits (búsqueda o normal)
    const getGlits = async (page, limit, order) => {
      console.log("🔍 getGlits llamado (PublicPlus):", {
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
        totalGlits.value = searchResults.value.length;
        return;
      }

      // Si no hay búsqueda, obtener glits normales
      console.log("📋 Obteniendo glits normales...");
      const response = await glitterApi.get("/glits", {
        params: {
          page,
          limit,
          order,
        },
      });
      glits.value = response.data.docs;
      totalGlits.value = response.data.totalGlits;
      console.log(totalGlits.value);
      console.table(glits.value);
    };

    // ✅ NUEVO: Función para limpiar búsqueda
    const clearSearch = () => {
      console.log("🧹 Limpiando búsqueda...");
      store.dispatch("search/clearSearch");
      store.dispatch("notifications/info", "Búsqueda limpiada");
      getGlits(currentPage.value, defaultLimit, currentOrder.value);
    };

    const btnArray = ref([
      {
        txt: "Follow",
        class: "btn-secondary",
        action: (glit) => followUser(glit),
        icon: '<i class="fa-solid fa-user-plus"></i>',
      },
      {
        txt: "Unfollow",
        class: "btn-secondary",
        action: (glit) => unfollowUser(glit),
        icon: '<i class="fa-solid fa-user-minus"></i>',
      },
      {
        txt: "Kudos",
        class: "btn-secondary",
        action: (glit) => kudo(glit),
        icon: '<i class="fa-solid fa-heart"></i>',
      },
      {
        txt: "DisKudos",
        class: "btn-secondary",
        action: (glit) => kudoDelete(glit),
        icon: '<i class="fa-solid fa-hand-middle-finger"></i>',
      },
      {
        txt: "Delete",
        class: "btn-secondary",
        action: (glit) => deleteGlit(glit),
        icon: '<i class="fa-solid fa-x"></i>',
      },
    ]);

    const deleteGlit = async (glit) => {
      try {
        await glitterApi.delete(`/glits/${glit._id}`);
        getGlits(currentPage.value, defaultLimit, currentOrder.value);
      } catch (error) {
        console.error(error);
      }
    };

    const followUser = async (glit) => {
      console.table(glit);
      try {
        await glitterApi.post(`/users/${glit.author._id}/follow`);
        // Mostrar notificación de éxito
        store.dispatch(
          "notifications/success",
          `Ahora sigues a ${glit.author.username}`
        );
      } catch (error) {
        console.error(error);
        // Mostrar notificación de error
        store.dispatch("notifications/error", "Error al seguir al usuario");
      }
    };

    const unfollowUser = async (glit) => {
      try {
        // El endpoint correcto es /follow, no /unfollow
        await glitterApi.delete(`/users/${glit.author._id}/follow`);
        // Mostrar notificación de éxito
        store.dispatch(
          "notifications/info",
          `Has dejado de seguir a ${glit.author.username}`
        );
      } catch (error) {
        console.error(error);
        // Mostrar notificación de error
        store.dispatch(
          "notifications/error",
          "Error al dejar de seguir al usuario"
        );
      }
    };

    const kudo = async (glit) => {
      try {
        console.log(glit);
        await glitterApi.post(`/glits/${glit._id}/kudos`);

        // ✅ FIX: No mutar directamente, recargar glits
        // Recargar glits para actualizar kudos
        getGlits(currentPage.value, defaultLimit, currentOrder.value);

        store.dispatch("notifications/success", "¡Kudos dado!");
      } catch (error) {
        console.error(error);
        store.dispatch("notifications/error", "Error al dar kudos");
      }
    };

    const kudoDelete = async (glit) => {
      try {
        console.log(glit);
        await glitterApi.delete(`/glits/${glit._id}/kudos`);

        // ✅ FIX: No mutar directamente, recargar glits
        // Recargar glits para actualizar kudos
        getGlits(currentPage.value, defaultLimit, currentOrder.value);

        store.dispatch("notifications/info", "Kudos eliminado");
      } catch (error) {
        console.error(error);
        store.dispatch("notifications/error", "Error al eliminar kudos");
      }
    };

    onMounted(() => {
      console.log("🚀 PublicPlusView montado");
      getGlits(currentPage.value, defaultLimit, currentOrder.value);
    });

    // ✅ NUEVO: Watch para detectar cambios en búsqueda
    watch(
      () => searchResults.value,
      (newResults) => {
        console.log("👀 Watch: searchResults cambió:", newResults.length);
        if (hasSearchResults.value) {
          console.log("📋 Actualizando glits con resultados de búsqueda");
          glits.value = newResults;
          totalGlits.value = newResults.length;
        }
      },
      { deep: true, immediate: true }
    );

    // ✅ NUEVO: Watch para detectar cuando se limpia la búsqueda
    watch(
      () => hasSearchResults.value,
      (hasSearch, oldHasSearch) => {
        console.log("👀 Watch: hasSearchResults cambió:", hasSearch);
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
      glits,
      glit,
      totalGlits,
      currentPage,
      currentOrder,
      btnArray,
      likeName,
      hasSearchResults, // ✅ NUEVO
      searchTerm, // ✅ NUEVO
      clearSearch, // ✅ NUEVO
    };
  },
};
</script>

<style>
header {
  text-shadow: 3px 3px #95a4ff;
  -webkit-text-stroke: 1px rgba(0, 0, 0);
  padding: 10px;
  font-size: 40px;
  font-weight: bold;
  color: #ffa580;
  letter-spacing: 2px;
}

/* ✅ NUEVO: Estilos para header de búsqueda */
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

/* 

Paginator

*/

.paginator {
  text-align: center;
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

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0rem;
}

.search-bar {
  margin-bottom: 1em;
}

@import "@vueform/toggle/themes/default.css";

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
</style>
