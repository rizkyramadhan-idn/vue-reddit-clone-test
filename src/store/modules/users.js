import { firestoreAction } from "vuexfire";
import { db } from "@/firebase/firebase";
import "firebase/firestore";

const state = {
  users: [],
};

const getters = {
  // Return array dari users.

  getUsers: (state) => {
    return state.users;
  },
  getUserById: (state) => {
    return state.users.reduce((byId, user) => {
      byId[user.id] = user;
      return byId;
    }, {});
  },
};

const actions = {
  // Action untuk melakukan init terhadap users.

  initUsers: firestoreAction((context) => {
    return context.bindFirestoreRef("users", db.collection("users"));
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
