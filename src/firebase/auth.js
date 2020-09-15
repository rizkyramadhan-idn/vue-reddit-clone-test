/* eslint-disable */

// Auth untuk firebase

import { firebase, db } from "@/firebase/firebase";
import store from "@/store/index";
import router from "@/router/index";

// Menggunakan observer untuk mengecek apakah user sedang login atau tidak.
// https://firebase.google.com/docs/auth/web/manage-users

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // Jika ada user, buat objek currentUser yang berisi data user.
    // Buat sebuah document baru di dalam collection 'users'.
    // Dispatch setUser dan setIsLoggedIn pada store vuex.

    const { uid, displayName, photoURL } = user.providerData[0];

    const currentUser = {
      id: uid,
      name: displayName,
      image: photoURL,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };

    db.collection("users")
      .doc(currentUser.id)
      .set(currentUser);

    store.dispatch("auth/setUser", currentUser);
    store.dispatch("auth/setIsLoggedIn", true);

    // Jika login berhasil maka arahkan ke /subreddits

    router.push("/subreddits").catch(() => {});
  } else {
    // Jika tidak ada user maka set default value untuk user dan isLoggedIn.

    store.dispatch("auth/setUser", null);
    store.dispatch("auth/setIsLoggedIn", false);
  }
});
