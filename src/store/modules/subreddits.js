import { firestoreAction } from "vuexfire";
import { db } from "@/firebase/firebase";
import "firebase/firestore";

const state = {
  subreddits: [],
};

const getters = {
  // Return array dari subreddit.

  getSubreddits: (state) => {
    return state.subreddits;
  },
};

const actions = {
  // Action untuk melakukan init terhadap subreddit.

  init: firestoreAction((context) => {
    return context.bindFirestoreRef("subreddits", db.collection("subreddits"));
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
