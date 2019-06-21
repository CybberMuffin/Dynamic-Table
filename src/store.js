import Vue from "vue";
import Vuex from "vuex";
import data from "./data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data,
    curPage: 1,
    perPage: 5,
    searchText: "",
    sortField: "",
    order: 1
  },
  getters: {
    fields: state => Object.keys(state.data[0]),

    filteredData: state => {
      return state.data.filter(
        e =>
          Object.values(e)
            .slice(1)
            .join("~")
            .toLowerCase()
            .indexOf(state.searchText.toLowerCase()) > -1
      );
    },

    rows: (state, getters) => {
      return getters.filteredData.slice(
        (state.curPage - 1) * state.perPage,
        state.curPage * state.perPage
      );
    },

    numPages: (state, getters) =>
      Math.ceil(getters.filteredData.length / state.perPage),

    searchTextValue: state =>
      state.searchText === "" ? "___" : state.searchText,

    dataLength: state => state.data.length,

    entriesRange: state => {
      return {
        from: (state.curPage - 1) * state.perPage + 1,
        to:
          state.curPage * state.perPage > state.data.length
            ? state.data.length
            : state.curPage * state.perPage
      };
    }
  },
  mutations: {
    set: (state, { key, value }) => (state[key] = value),

    setSortKey: (state, field) => {
      if (state.sortField === field) state.order = -state.order;

      state.sortField = field;

      state.data.sort(
        (a, b) =>
          (a[state.sortField] > b[state.sortField] ? 1 : -1) * state.order
      );
    },

    setData: (state, payload) => (state.data = JSON.parse(payload)),

    setPage: (state, payload) => (state.curPage = payload),

    setDataChanges: (state, { index, key, text }) =>
      (state.data[index][key] = text)
  },
  actions: {}
});
