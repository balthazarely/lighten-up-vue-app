import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCXL4MoQTBkQHX_eG8mR8QcD6JhlmbUuQw",
  authDomain: "lighten-up-vue-app.firebaseapp.com",
  databaseURL: "https://lighten-up-vue-app.firebaseio.com",
  projectId: "lighten-up-vue-app",
  storageBucket: "lighten-up-vue-app.appspot.com",
  messagingSenderId: "1000110452783",
  appId: "1:1000110452783:web:382699e517e662f2dfd6da",
  measurementId: "G-MR2V318H35"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDB = firebaseApp.database()

export { firebaseAuth, firebaseDB }