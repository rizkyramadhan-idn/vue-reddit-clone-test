/* eslint-disable */

// Import firebase, lalu gunakan firebaseConfig yang tersedia
// pada firebase console. Selanjutnya, lakukan inisialisasi
// terhadap config tersebut dan lakukan export.

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCbz6Ac3k29ZgYdHgguzohleIlr7KHdyF4",
  authDomain: "reddit-clone-d21fb.firebaseapp.com",
  databaseURL: "https://reddit-clone-d21fb.firebaseio.com",
  projectId: "reddit-clone-d21fb",
  storageBucket: "reddit-clone-d21fb.appspot.com",
  messagingSenderId: "521301754115",
  appId: "1:521301754115:web:8dc44785aa681e6308e936",
};

firebase.initializeApp(firebaseConfig);

// Membuat database untuk Cloud Firestore.
// https://firebase.google.com/docs/firestore/quickstart
// Lalu meng-exportnya.

const db = firebase.firestore();

export { firebase, db };
