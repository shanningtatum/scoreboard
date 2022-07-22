// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  get,
} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// query stuff
const $displayStats = $(".displayStats");

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

// stores all recent stats so I can use the data
const recentStats = [];

// stores kate's stats
const kateStats = [];
const katePass = [];
let katePassRate;

// stores LL stats
const lastLaughStats = [];
const lastLaughPass = [];
let lastLaughPassRate;

// stores SC stats
const shortCutStats = [];
const shortCutPass = [];
let shortCutPassRate;

// stores elevator stats
const elevatorStats = [];
const elevatorPass = [];
let elevatorPassRate;

export default function roomObj(statObject) {
  push(dbRef, statObject);
}

export function fetchData() {
  get(dbRef).then((response) => {
    if (response.exists()) {
      response.forEach((stat) => {
        recentStats.push(stat.val());
      });
      displayData();
    } else {
      console.log("no data!");
    }
  });
}

function displayData() {
  calculateData();
  const lastTen = recentStats.slice(-10);
  lastTen.forEach((entry) => {
    $displayStats.prepend(`<ul>
    <li>${entry.date}</li>
    <li>${entry.name}</li>
    <li>${entry.pass}</li>
    <li>${entry.time}</li>
    <li>${entry.player}</li>
    <li>${entry.hint}</li></ul>`);
  });
}

function calculateData() {
  // console.log(recentStats);

  recentStats.forEach((result) => {
    if (result.name === "Kate's Motel") {
      // stores all objects with kate's motel in array
      kateStats.push(result);

      // saves pass objects in separate array
      if (result.pass === "Yes") {
        katePass.push(result);
      }

      katePassRate = `${((katePass.length / kateStats.length) * 100).toFixed(
        2
      )}%`;
    } else if (result.name === "The Short Cut") {
      // stores all objects with the short cut in array
      shortCutStats.push(result);

      // saves pass objects in separate array
      if (result.pass === "Yes") {
        shortCutPass.push(result);
      }

      shortCutPassRate = `${(
        (shortCutPass.length / shortCutStats.length) *
        100
      ).toFixed(2)}%`;
    } else if (result.name === "The Last Laugh") {
      // stores all objects with the last laugh in array
      lastLaughStats.push(result);

      // saves pass objects in separate array
      if (result.pass === "Yes") {
        lastLaughPass.push(result);
      }

      lastLaughPassRate = `${(
        (lastLaughPass.length / lastLaughStats.length) *
        100
      ).toFixed(2)}%`;
    } else if (result.name === "The Elevator") {
      // stores all objects with the elevator in array
      elevatorStats.push(result);

      // saves pass objects in separate array
      if (result.pass === "Yes") {
        elevatorPass.push(result);
      }

      elevatorPassRate = `${(
        (elevatorPass.length / elevatorStats.length) *
        100
      ).toFixed(2)}%`;
    }
  });

  console.log(katePassRate);
  console.log(shortCutPassRate);
  console.log(lastLaughPassRate);
  console.log(elevatorPassRate);
}

function passRateStats(pass, total) {}
