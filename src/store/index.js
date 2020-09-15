/* eslint-disable */

import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations } from "vuexfire";

// Import auth untuk firebase dan menambahkannya pada modules vuex.

import auth from "@/store/modules/auth";
import subreddit from "@/store/modules/subreddit";
import subreddits from "@/store/modules/subreddits";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  // Menggunakan vuexfireMutations sebagai mutations.

  mutations: vuexfireMutations,
  actions: {},
  modules: {
    auth,
    subreddit,
    subreddits,
  },
});
