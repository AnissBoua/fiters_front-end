import { createStore } from "vuex";
import router from "@/router";
import axios from "axios";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    lists: {
      namespaced: true,
      state: {
        lists: [],
      },
      getters: {
        lists: (state) => {
          return state.lists;
        },
      },
      mutations: {
        SET_LISTS(state, lists) {
          state.lists = lists;
        },
        ADD_LIST(state, list){
          state.lists.push(list);
        },
      },
      actions: {
        getLists({ commit }) {
          axios.get("http://127.0.0.1:8000/lists").then((data) => {
            commit("SET_LISTS", data.data.lists);
          });
        },
        postList({ commit }, newList) {
          console.log(newList);
          axios.post("http://127.0.0.1:8000/newlist", newList).then((data) => {
            router.go();
          });
        },
        deleteList({ commit }, id) {
          axios.delete("http://127.0.0.1:8000/deletelists/" + id).then((data) => {
            if (data.status == 202) {
              router.go();
            }
          });
        },
      },
    },
    tasks: {
      namespaced: true,
      state: {
        tasks: [],
      },
      getters: {
        tasks: (state) => {
          return state.tasks;
        },
      },
      mutations: {
        SET_TASKS(state, tasks) {
          state.tasks = tasks;
        },
        ADD_TASK(state, task){
          state.tasks.push(task);
        },
      },
      actions: {
        getTasks({ commit }) {
          axios.get("http://127.0.0.1:8000/tasks").then((data) => {
            commit("SET_TASKS", data.data.tasks);
          });
        },
        postTask({ commit }, newTask) {
          axios.post("http://127.0.0.1:8000/newtask", newTask).then((data) => {
            router.go();
          });
        },
        deleteTask({ commit }, id) {
          console.log(id);
          axios.delete("http://127.0.0.1:8000/deletetasks/" + id).then((data) => {
            if (data.status == 202) {
              router.go();
            }
          });
        },
      },
    },
  },
});
