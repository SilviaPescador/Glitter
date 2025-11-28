import glitterApi from "@/api/glitterApi";

const state = {
  token: localStorage.getItem("access_token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("access_token"),
  loading: false,
  error: null,
};

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  currentUser: (state) => state.user,
  token: (state) => state.token,
  isLoading: (state) => state.loading,
  authError: (state) => state.error,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    state.isAuthenticated = !!token;
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  },

  SET_USER(state, user) {
    state.user = user;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  },

  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  SET_ERROR(state, error) {
    state.error = error;
  },

  CLEAR_AUTH(state) {
    state.token = null;
    state.user = null;
    state.isAuthenticated = false;
    state.error = null;
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
};

const actions = {
  // Login
  async login({ commit }, credentials) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      const response = await glitterApi.post("/auth/login", credentials);
      const { token, user } = response.data;

      commit("SET_TOKEN", token);
      commit("SET_USER", user);
      commit("SET_LOADING", false);

      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.response?.data?.message || "Login failed");
      commit("SET_LOADING", false);
      return { success: false, error: error.response?.data?.message };
    }
  },

  // Register
  async register({ commit }, userData) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    try {
      await glitterApi.post("/auth/register", userData);
      commit("SET_LOADING", false);
      return { success: true };
    } catch (error) {
      commit(
        "SET_ERROR",
        error.response?.data?.message || "Registration failed"
      );
      commit("SET_LOADING", false);
      return { success: false, error: error.response?.data?.message };
    }
  },

  // Logout
  logout({ commit }) {
    commit("CLEAR_AUTH");
  },

  // Verify token
  async verifyToken({ commit, state }) {
    if (!state.token) {
      return false;
    }

    try {
      const response = await glitterApi.get("/auth/verify-token");
      if (response.data.authenticated) {
        commit("SET_USER", response.data.user);
        return true;
      } else {
        commit("CLEAR_AUTH");
        return false;
      }
    } catch (error) {
      commit("CLEAR_AUTH");
      return false;
    }
  },

  // Update user info
  updateUser({ commit }, user) {
    commit("SET_USER", user);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
