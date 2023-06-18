<template>
  <nav class="navbar navbar-expand-lg navbar-light">

    <div class="container container-fluid justify-content-between">

      <!-- Left elements -->
      <div class="d-flex">

        <!-- Glitter logo -->
        <router-link to="/landing-page" class="navbar-brand me-2 mb-1 d-flex align-items-center">
          <img src="../assets/img/logo_navbar.svg" height="35" alt="Glitter Logo" loading="lazy"
            style="margin-top: 2px;" />
        </router-link>

        <!-- Search -->
        <form class="input-group w-auto my-auto d-none d-sm-flex" @submit.prevent="search">

          <div class="form-outline">

            <input 
            type="text" 
            class="form-control" 
            placeholder="Search glits..." 
            v-model="searchTerm"
            @keyup="$emit('updateSearch', searchTerm)" />

          </div>

          <button 
          type="submit" 
          class="btn btn-primary btn-form" 
          @click="$emit('updateSearch', searchTerm)">
          <i class="fas fa-search"></i></button>

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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import glitterApi from "../api/glitterApi";
import LogoutButton from "./LogoutButton.vue";

export default {
  name: 'NavBar',
  components: {
    LogoutButton,
  },
  props: [
    'modelValue'
  ],


  setup(props) {
    const searchTerm = ref(props.modelValue);
    const router = useRouter();
    // The function returns immediately if the value of searchTerm is falsy to prevent sending an empty search to the server.

    const search = async () => {
      if (!searchTerm.value) {
        return;
      }
      try {
        const response = await glitterApi.get(`/glits?search=${searchTerm.value}`);
        const data = response.data.docs;
        if (data.length > 0) {
          router.push({
            name: 'search-results',
            params: {
              searchTerm: searchTerm.value,
            },
          });
        } else {
          router.push({
            name: 'not-found',
          });
        }
      } catch (error) {
        console.error(error);
      }
    };


    function checkLogin() {
      const token = localStorage.getItem('access_token');
      if (token) {
        return true;
      } else {
        return false;
      }
    }


    function checkLogout() {
      const token = localStorage.getItem('access_token');
      if (!token) {
        return true;
      } else {
        return false;
      }
    }


    return {
      searchTerm,
      search,
      checkLogin,
      checkLogout,
    };
  },
};
</script>

<style scoped>
.material-icons {
  color: white;
  font-size: 1.4em;
  background-color: #A0C3D2;
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
  transition: .2s all ease-in-out;
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