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

const $katesPassRate = $(".katesPassRate");
const $elevatorPassRate = $(".elevatorPassRate");
const $lastLaughPassRate = $(".lastLaughPassRate");
const $shortCutPassRate = $(".shortCutPassRate");

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
const fastTime = [];

// stores kate's stats
const kateStats = [];
const katePass = [];
const kateTime = [];
let katePassRate;

// stores LL stats
const lastLaughStats = [];
const lastLaughPass = [];
const lastLaughTime = [];
let lastLaughPassRate;

// stores SC stats
const shortCutStats = [];
const shortCutPass = [];
const shortCutTime = [];
let shortCutPassRate;

// stores elevator stats
const elevatorStats = [];
const elevatorPass = [];
const elevatorTime = [];
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
  const lastTen = recentStats.slice(-12);
  lastTen.forEach((entry) => {
    $displayStats.prepend(`<ul>
    <li>${entry.date}</li>
    <li class="statName">${entry.name}</li>
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
    } else if (result.name === "The Short Cut") {
      // stores all objects with the short cut in array
      shortCutStats.push(result);

      // saves pass objects in separate array
      if (result.pass === "Yes") {
        shortCutPass.push(result);
      }
    } else if (result.name === "The Last Laugh") {
      // stores all objects with the last laugh in array
      lastLaughStats.push(result);

      // saves pass objects in separate array
      if (result.pass === "Yes") {
        lastLaughPass.push(result);
        console.log(lastLaughPass);
      }
    } else if (result.name === "The Elevator") {
      // stores all objects with the elevator in array
      elevatorStats.push(result);

      // saves pass objects in separate array
      if (result.pass === "Yes") {
        elevatorPass.push(result);
      }
    }
  });

  // gives value to elevator pass rate
  elevatorPassRate = `${(
    (elevatorPass.length / elevatorStats.length) *
    100
  ).toFixed(2)}%`;
  // gives value to Kate's Pass Rate
  katePassRate = `${((katePass.length / kateStats.length) * 100).toFixed(2)}%`;
  // gives value to LL past rate
  lastLaughPassRate = `${(
    (lastLaughPass.length / lastLaughStats.length) *
    100
  ).toFixed(2)}%`;
  // gives value to SC pass rate
  shortCutPassRate = `${(
    (shortCutPass.length / shortCutStats.length) *
    100
  ).toFixed(2)}%`;

  // assign pass rate variable to elevator pass rate class
  $elevatorPassRate.text(elevatorPassRate);
  elevatorTime.push(findBestTime(elevatorPass));
  // displayBestTime(elevatorTime);

  // assign pass rate variable to kates pass rate class
  $katesPassRate.text(katePassRate);
  kateTime.push(findBestTime(katePass));
  // displayBestTime(kateTime);

  // assign pass rate variable to last laugh pass rate class
  $lastLaughPassRate.text(lastLaughPassRate);
  lastLaughTime.push(findBestTime(lastLaughPass));
  displayBestTime(lastLaughTime);

  // assign pass rate variable to short cut pass rate class
  $shortCutPassRate.text(shortCutPassRate);
  shortCutTime.push(findBestTime(shortCutPass));
  // displayBestTime(shortCutTime);
}

// will display best time
function displayBestTime(array) {
  console.log("the best times");
  console.log(array);
}

// calculates the best time of each room
function findBestTime(string) {
  // goes through all of the passed room array to push the time, id, and date in a new array

  for (let i = 0; i < string.length; i++) {
    fastTime.push({
      time: parseInt(string[i].time.replace(":", "")),
      id: `${i}`,
      date: string[i].date,
    });
  }

  console.log(string);
  console.log(fastTime);

  // finds the fastest time somoene completed the room and stores into variable
  let fastestTime = Math.min(...fastTime.map((item) => item.time));

  // console.log(fastestTime);
  // now need to find the fastest time in pass stats

  // converting the variable back into a string
  let makeIntoString = [
    fastestTime.toString().slice(0, 2),
    fastestTime.toString().slice(-2),
  ].join(":");

  // find the object in the db with the best time to get player, hint, and date info
  let recordDate = string.find((element) => element.time == makeIntoString);

  console.log(recordDate);
  return recordDate;
}

// PSEUDO

// go through the array object
// push these numbers and their index in another array
// can you use math.min on it?
