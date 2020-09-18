import { firebase, db } from "@/firebase/firebase";
// import "firebase/firestore";
import { firestoreAction } from "vuexfire";

const posts = db.collection("posts");

const state = {
  subreddits: [],
  posts: [],
};

const getters = {
  getPosts: (state) => {
    return state.posts;
  },

  // Return array dari subreddits.

  getSubreddit: (state) => {
    return state.subreddits[0] ? state.subreddits[0] : {};
  },
};

const actions = {
  // Action untuk membuat post baru pada collection 'posts'.

  createNewPost: async ({ getters }, submittedPost) => {
    const newPostDocument = posts.doc();

    // Post baru yang sedang dibuat pada collection bernama 'posts'.

    const newPost = {
      id: newPostDocument.id,
      subreddit_id: getters.getSubreddit.id,
      user_id: firebase.auth().currentUser.uid,
      ...submittedPost,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    };

    // Membuat post baru pada collection 'post'.

    try {
      await posts.doc(newPost.id).set(newPost);
    } catch (error) {
      console.error(error);
    }
  },

  // Mendapatkan sebuah subreddit berdasarkan apa yang sedang dibuka oleh user.
  // Saat ini, ada empat subreddits, yaitu r/OnePiece, r/memes, r/indonesia, r/PinkOmega.
  // Jika yang dibuka adalah r/memes, maka initSubreddit adalah r/memes.

  initSubreddit: firestoreAction((context, name) => {
    return context.bindFirestoreRef(
      "subreddits",
      db.collection("subreddits").where("name", "==", name)
    );
  }),

  // Action untuk mendapatkan semua post pada collection 'posts'
  // sesuai dengan subreddit_id-nya. r/memes hanya akan menampilkan
  // post yang ada di subreddit itu saja.

  initPosts: firestoreAction((context, subreddit_id) => {
    return context.bindFirestoreRef(
      "posts",
      posts.where("subreddit_id", "==", subreddit_id)
    );
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
};
