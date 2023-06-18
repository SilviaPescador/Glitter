<template>
  <div class="glits-container">
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div class="mt-2">
        <header>Explore</header>

        <div class="search-bar d-flex justify-content-end">
          <Toggle 
          v-model="currentOrder" 
          class="toggle-blue" 
          :falseValue="'desc'" 
          :trueValue="'asc'"
          :offLabel="'Descending'" 
          :onLabel="'Ascending'" />
        </div>

        <GlitItem v-for="glit in glits" 
        :key="glit._id" 
        :author="glit.author.username" 
        :publishDate="glit.publishDate"
        :text="glit.text" 
        :glit="glit" 
        :kudos="glit.kudos" 
        :likeName="likeName" 
        :imagePath="glit.imagePath" />

      </div>

      <footer class="text-center">
        <p class="mb-3">Don't miss what's happening! Users on Glitter are the first to know.</p>

        <router-link router-link to="/signup" class="nav-link active mb-3" aria-current="page">
          <button class="btn-see-more btn btn-secondary" type="button">Sign up now to see more</button>

          <!-- Paginator -->
          <div class="paginator">

            <vue-awesome-paginate 
            :total-items="glits.length" 
            :items-per-page="glits.limit" 
            v-model="currentPage">

              <template #prev-button>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="12" height="12" viewBox="0 0 24 24">
                    <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                  </svg>
                </span>
              </template>

              <template #next-button>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="12" height="12" viewBox="0 0 24 24">
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
import { ref, onMounted, watch } from "vue";
import GlitItem from "../components/GlitItem.vue";
import Toggle from '@vueform/toggle'

const defaultPage = 1
const defaultLimit = 7
const defaultOrder = 'desc'

export default {
  name: 'PublicView',
  components: {
    GlitItem,
    Toggle
  },
  setup() {
    const currentPage = ref(defaultPage)
    const currentOrder = ref(defaultOrder);
    const glits = ref([]);
    const glit = ref('')

    const likeName = 'kudos'

    const getGlits = async (page, limit, order) => {
      const response = await glitterApi.get("/glits", {
        params: {
          page,
          limit,
          order
        }
      });
      glits.value = response.data.docs;
    };

    onMounted(() => {
      getGlits(currentPage.value, defaultLimit, currentOrder.value);
    });

    watch(() => currentPage.value, () => {
      getGlits(currentPage.value, defaultLimit, currentOrder.value);
    })

    watch(() => currentOrder.value, () => {
      getGlits(currentPage.value, defaultLimit, currentOrder.value);
    })

    return {
      glits: glits,
      glit: glit,
      currentPage,
      currentOrder,
      likeName
    };
  },
}
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

.btn-see-more {
  line-height: 28pt;
  padding: 0 20px;
  background: #ffa580;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
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
  margin-bottom: 1em
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
  ;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
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

.paginator li:nth-child(2)>.paginate-buttons.number-buttons {
  border-start-start-radius: 25px;
  border-end-start-radius: 25px;
  transition: none;
}

.paginator li:nth-last-child(2)>.paginate-buttons.number-buttons {
  border-start-end-radius: 25px;
  border-end-end-radius: 25px;
}

.paginator .active-page {
  background-color: #99e98e;
  ;
  color: f8f4e5;
}

.paginator .active-page {
  background-color: #99e98e;
  ;
  color: f8f4e5;
}

.paginator .paginate-buttons:hover {
  background-color: #f8f4e5;
}

.paginator .active-page:hover {
  background-color: #99e98e;
  ;
}

.paginator .back-button:active,
.paginator .next-button:active {
  background-color: #e6e6e6;
}

/*

Paginator

*/
</style>
