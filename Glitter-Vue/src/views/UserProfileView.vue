<template>
  <header>
    Profile
  </header>
  <UserCard :username="username" :email="email" :btn="btn" :following="following.length" />
</template>

<script>
import UserCard from "../components/UserCard.vue";
import glitterApi from "../api/glitterApi";
import { ref, onMounted } from 'vue';

export default {
  name: "UserProfileView",
  components: {
    UserCard,
  },
  setup() {
    const username = ref('');
    const email = ref('');
    const following = ref('');
    const btn = ref({
      text: 'Unsubscribe',
      class: 'btn btn-primary btn-rounded btn-lg',
      route: "/unsubscribe"
    });

    const getUser = async () => {
      const response = await glitterApi.get('/users');
      const user = response.data.data;
      username.value = user.username;
      email.value = user.email;
      following.value = user.following;
    };

    onMounted(() => {
      getUser();
    });

    return {
      username,
      email,
      btn,
      following,
    };
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  text-shadow: 3px 3px #95a4ff;
  -webkit-text-stroke: 1px rgba(0, 0, 0);
  padding: 20px;
  font-size: 40px;
  font-weight: bold;
  color: #ffa580;
  letter-spacing: 2px;
}
</style>