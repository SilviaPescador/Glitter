<template>
  <teleport to="body">
    <div class="notification-container">
      <transition-group name="notification" tag="div">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification-toast', `notification-${notification.type}`]"
          @click="removeNotification(notification.id)"
        >
          <div class="notification-content">
            <i :class="['fas', notification.icon]"></i>
            <span class="notification-message">{{ notification.message }}</span>
          </div>
          <button
            class="notification-close"
            @click.stop="removeNotification(notification.id)"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "NotificationToast",
  setup() {
    const store = useStore();

    const notifications = computed(
      () => store.getters["notifications/allNotifications"]
    );

    const removeNotification = (id) => {
      store.dispatch("notifications/remove", id);
    };

    return {
      notifications,
      removeNotification,
    };
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}

.notification-toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
  border-left: 4px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}

.notification-toast:hover {
  transform: translateX(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.notification-content i {
  font-size: 1.2em;
}

.notification-message {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.notification-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

/* Tipos de notificaciones */
.notification-success {
  border-left-color: #4caf50;
  background: #f1f8f4;
}

.notification-success .notification-content i {
  color: #4caf50;
}

.notification-error {
  border-left-color: #f44336;
  background: #fef5f5;
}

.notification-error .notification-content i {
  color: #f44336;
}

.notification-warning {
  border-left-color: #ff9800;
  background: #fff8f0;
}

.notification-warning .notification-content i {
  color: #ff9800;
}

.notification-info {
  border-left-color: #2196f3;
  background: #f0f7ff;
}

.notification-info .notification-content i {
  color: #2196f3;
}

/* Animaciones */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-enter-active {
  animation: slideIn 0.3s ease;
}

.notification-leave-active {
  animation: slideIn 0.3s ease reverse;
}

.notification-move {
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .notification-container {
    right: 10px;
    left: 10px;
    max-width: none;
  }

  .notification-toast {
    padding: 12px 16px;
  }

  .notification-message {
    font-size: 13px;
  }
}
</style>
