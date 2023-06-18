<template>
  <div>

    <NavBar 
    v-model="navBarSearch" 
    @updateSearch="updateSearch" />
    
    <router-view 
    v-model="navBarSearch" />

  </div>
</template>

<script>

import NavBar from "@/components/NavBar.vue"
import { ref } from "vue";
// import { whatch } from "vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  props: ['modelValue'],

  setup(props, context) {
    const navBarSearch = ref('');

    const updateSearch = (newSearch) => {
      console.log('navBarSearch updated: ' + newSearch)
      navBarSearch.value = newSearch;
      context.emit('update:modelValue', navBarSearch.value)
      console.log(props.modelValue)
    }

    return {
      navBarSearch,
      updateSearch
    };
  }
}
</script>

<style>
#app {
  color: #545454;
}
</style>