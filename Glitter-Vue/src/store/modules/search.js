// Módulo de búsqueda para Vuex
const state = {
  searchTerm: "",
  searchResults: [],
  isSearching: false,
  hasSearched: false,
};

const getters = {
  searchTerm: (state) => state.searchTerm,
  searchResults: (state) => state.searchResults,
  isSearching: (state) => state.isSearching,
  hasSearched: (state) => state.hasSearched,
  hasResults: (state) => state.searchResults.length > 0,
};

const mutations = {
  SET_SEARCH_TERM(state, term) {
    state.searchTerm = term;
  },

  SET_SEARCH_RESULTS(state, results) {
    state.searchResults = results;
  },

  SET_SEARCHING(state, isSearching) {
    state.isSearching = isSearching;
  },

  SET_HAS_SEARCHED(state, hasSearched) {
    state.hasSearched = hasSearched;
  },

  CLEAR_SEARCH(state) {
    state.searchTerm = "";
    state.searchResults = [];
    state.hasSearched = false;
  },
};

const actions = {
  setSearchResults({ commit }, { term, results }) {
    commit("SET_SEARCH_TERM", term);
    commit("SET_SEARCH_RESULTS", results);
    commit("SET_HAS_SEARCHED", true);
  },

  setSearching({ commit }, isSearching) {
    commit("SET_SEARCHING", isSearching);
  },

  clearSearch({ commit }) {
    commit("CLEAR_SEARCH");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
