<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <i v-if="icon" :class="['fas', icon]"></i>
              {{ title }}
            </h3>
            <button class="modal-close" @click="handleCancel">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="modal-body">
            <p>{{ message }}</p>
          </div>

          <div class="modal-footer">
            <button class="btn btn-cancel" @click="handleCancel">
              {{ cancelText }}
            </button>
            <button
              :class="['btn', 'btn-confirm', `btn-${type}`]"
              @click="handleConfirm"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "ConfirmModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "Confirmar acción",
    },
    message: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: "Confirmar",
    },
    cancelText: {
      type: String,
      default: "Cancelar",
    },
    type: {
      type: String,
      default: "danger", // danger, warning, info, success
      validator: (value) =>
        ["danger", "warning", "info", "success"].includes(value),
    },
    icon: {
      type: String,
      default: "fa-exclamation-triangle",
    },
    closeOnOverlay: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["confirm", "cancel", "update:show"],
  setup(props, { emit }) {
    const handleConfirm = () => {
      emit("confirm");
      emit("update:show", false);
    };

    const handleCancel = () => {
      emit("cancel");
      emit("update:show", false);
    };

    const handleOverlayClick = () => {
      if (props.closeOnOverlay) {
        handleCancel();
      }
    };

    return {
      handleConfirm,
      handleCancel,
      handleOverlayClick,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(2px);
}

.modal-container {
  background: #f8f4e5;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(0, 0, 0, 1);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 1px;
}

.modal-title i {
  font-size: 1.1em;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 4px 8px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.modal-close:hover {
  opacity: 1;
}

.modal-body {
  padding: 24px;
}

.modal-body p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #545454;
  letter-spacing: 0.5px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  justify-content: flex-end;
}

.btn {
  padding: 10px 24px;
  border-radius: 6px;
  border: 2px solid rgba(0, 0, 0, 1);
  font-weight: 600;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.btn-cancel {
  background: #e0e0e0;
  color: #545454;
}

.btn-cancel:hover {
  background: #d0d0d0;
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 #95a4ff;
}

.btn-confirm {
  color: white;
}

.btn-danger {
  background: #f44336;
}

.btn-danger:hover {
  background: #d32f2f;
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 #ffa580;
}

.btn-warning {
  background: #ff9800;
}

.btn-warning:hover {
  background: #f57c00;
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 #ffa580;
}

.btn-info {
  background: #2196f3;
}

.btn-info:hover {
  background: #1976d2;
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 #95a4ff;
}

.btn-success {
  background: #4caf50;
}

.btn-success:hover {
  background: #388e3c;
  transform: translateY(-2px);
  box-shadow: 2px 2px 0 #95a4ff;
}

/* Animaciones de transición */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-50px);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    width: 95%;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 16px;
  }

  .modal-footer {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
