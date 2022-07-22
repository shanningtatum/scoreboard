// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyB1GiZczbIxSso7zE6CYelGG34X7I5kECE",
  authDomain: "scoreboard-b9174.firebaseapp.com",
  databaseURL: "https://scoreboard-b9174-default-rtdb.firebaseio.com",
  projectId: "scoreboard-b9174",
  storageBucket: "scoreboard-b9174.appspot.com",
  messagingSenderId: "116544782893",
  appId: "1:116544782893:web:89ed212eda7c5634f5aea4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database);

export default function roomObj(statObject) {
  push(dbRef, statObject);
}
