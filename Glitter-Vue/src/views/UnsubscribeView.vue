<template>
  <div class="message-container">
    <div class="container d-flex flex-column justify-content-center align-items-center">
      <div class="mt-2">
        <GlitItem class="message" :author="author" :publishDate="publishDate" :text="text" />
      </div>
      <div><button class="unsubscribeButton" @click="unsubscribe">Yes, it's time to leave the nest...</button></div>
    </div>
  </div>
</template> 

<script>
import glitterApi from "../api/glitterApi"
import GlitItem from "../components/GlitItem.vue";
import { useRouter } from 'vue-router'


export default {
  name: 'UnsubscribeView',
  components: {
    GlitItem
  },
  setup() {
    const router = useRouter()
    const author = "Glitter"
    const publishDate = new Date()
    const text = "Nooo :(. Are you sure you want to leave us? We'll miss you!"

    const unsubscribe = async () => {
      try {
        const response = await glitterApi.delete("/users", { headers: { authorization: `Bearer ${localStorage.getItem("jwtToken")}` } });
        console.log(response.data);
        window.alert("It was beautiful while it lasted 😢");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error(error);
        window.alert("There was an error while unsubscribing, please try again later");
      }
    };

    return {
      author,
      publishDate,
      text,
      unsubscribe
    };
  }
}
</script>

<style scoped>
.message-container {
  margin-top: 10%;
}

.message {
  width: 500px;
}

.unsubscribeButton {
  color: aliceblue;
  display: block;
  margin: 0 auto;
  line-height: 28pt;
  padding: 0 20px;
  background: #ffa580;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}
</style>