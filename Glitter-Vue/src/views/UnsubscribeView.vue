<template>
  <div class="message-container">
    <div
      class="container d-flex flex-column justify-content-center align-items-center"
    >
      <div class="mt-2">
        <GlitItem
          class="message"
          :author="author"
          :publishDate="publishDate"
          :text="text"
        />
      </div>
      <div>
        <button class="unsubscribeButton" @click="showConfirmation">
          Yes, it's time to leave the nest...
        </button>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <ConfirmModal
      :show="showModal"
      title="Confirmar baja"
      message="¿Estás seguro de que quieres darte de baja? Esta acción no se puede deshacer."
      confirmText="Sí, darme de baja"
      cancelText="No, quedarme"
      type="danger"
      icon="fa-user-times"
      @confirm="unsubscribe"
      @cancel="showModal = false"
      @update:show="showModal = $event"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import glitterApi from "../api/glitterApi";
import GlitItem from "../components/GlitItem.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

export default {
  name: "UnsubscribeView",
  components: {
    GlitItem,
    ConfirmModal,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const showModal = ref(false);

    const author = "Glitter";
    const publishDate = new Date();
    const text = "Nooo :(. Are you sure you want to leave us? We'll miss you!";

    // Mostrar modal de confirmación
    const showConfirmation = () => {
      showModal.value = true;
    };

    // Unsubscribe con mejor manejo
    const unsubscribe = async () => {
      try {
        const response = await glitterApi.delete("/users");

        console.log(response.data);

        store.dispatch("notifications/info", "Fue hermoso mientras duró 😢");

        store.dispatch("auth/logout");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error("Error al darse de baja:", error);
        store.dispatch(
          "notifications/error",
          "Hubo un error al darte de baja. Por favor, intenta más tarde"
        );
      }
    };

    return {
      author,
      publishDate,
      text,
      showModal,
      showConfirmation,
      unsubscribe,
    };
  },
};
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
  transition: 0.2s all ease-in-out;
  outline: none;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px 1px #95a4ff, 3px 3px 1px 2px rgba(0, 0, 0, 1);
}
</style>
