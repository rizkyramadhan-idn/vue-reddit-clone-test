/* eslint-disable */

// Module untuk melakukan auth pada firebase melalui Vuex store.

import { firebase, db } from "@/firebase/firebase";

// Membuat state untuk auth firebase.

const state = {
  user: null,
  isLoggedIn: false,
};

const getters = {
  getUser: (state) => {
    return state.user;
  },
  getIsLoggedIn: (state) => {
    return state.isLoggedIn;
  },
};

// Membuat mutations.

const mutations = {
  // Melakukan mutation untuk meng-set user yang sedang login.

  setUser: (state, payload) => {
    state.user = payload;
  },

  // Melakukan mutation untuk meng-set bahwa user telah berhasil login.

  setIsLoggedIn: (state, payload) => {
    state.isLoggedIn = payload;
  },
};

// Membuat actions.

const actions = {
  // Melakukan action untuk login dengan menggunakan google account.

  userLogin: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  },

  // Action untuk meng-set data user yang sedang login.

  setUser: (context, payload) => {
    context.commit("setUser", payload);
  },

  // Action untuk meng-set value isLeggedIn menjadi true atau false.

  setIsLoggedIn: (context, payload) => {
    context.commit("setIsLoggedIn", payload);
  },

  // Action untuk melakukan logout terhadap user yang sedang login.

  userLogout: async () => {
    await firebase.auth().signOut();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
