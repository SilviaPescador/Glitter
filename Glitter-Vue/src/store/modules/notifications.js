// Sistema de notificaciones tipo toast
const state = {
  notifications: [],
};

const getters = {
  allNotifications: (state) => state.notifications,
};

const mutations = {
  ADD_NOTIFICATION(state, notification) {
    const id = Date.now();
    state.notifications.push({
      id,
      ...notification,
      timestamp: new Date(),
    });

    // Auto-borrado después de 5 segundos
    if (notification.autoClose !== false) {
      setTimeout(() => {
        state.notifications = state.notifications.filter((n) => n.id !== id);
      }, notification.duration || 5000);
    }
  },

  REMOVE_NOTIFICATION(state, id) {
    state.notifications = state.notifications.filter((n) => n.id !== id);
  },

  CLEAR_NOTIFICATIONS(state) {
    state.notifications = [];
  },
};

const actions = {
  success({ commit }, message) {
    commit("ADD_NOTIFICATION", {
      type: "success",
      message,
      icon: "fa-check-circle",
    });
  },

  error({ commit }, message) {
    commit("ADD_NOTIFICATION", {
      type: "error",
      message,
      icon: "fa-exclamation-circle",
      duration: 7000,
    });
  },

  warning({ commit }, message) {
    commit("ADD_NOTIFICATION", {
      type: "warning",
      message,
      icon: "fa-exclamation-triangle",
    });
  },

  info({ commit }, message) {
    commit("ADD_NOTIFICATION", {
      type: "info",
      message,
      icon: "fa-info-circle",
    });
  },

  remove({ commit }, id) {
    commit("REMOVE_NOTIFICATION", id);
  },

  clear({ commit }) {
    commit("CLEAR_NOTIFICATIONS");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
