import roomObj from "./database.js";
import { fetchData } from "./database.js";

const app = {};

// query button for event listener
app.$submitButton = $(".submitButton");
app.$passYes = $("#passYes");
app.$passNo = $("#passNo");

// query
app.$displayStats = $(".displayStats");
app.$timeFieldset = $(".timeFieldset");

app.addEventListener = function () {
  app.$submitButton.on("click", function (e) {
    e.preventDefault();
    // query input buttons

    app.$roomName = $("input[type='radio'][name='roomName']:checked");
    app.$passBoolean = $("input[type='radio'][name='passBoolean']:checked");
    app.$playerAmt = $("input[type='radio'][name='playerAmt']:checked");
    app.$hintAmt = $("input[type='radio'][name='hintAmt']:checked");
    app.$timePlayed = $(".timePlayed").val();

    app.readInput();
    // clear radio inputs
  });
  app.$passYes.on("click", function () {
    app.$timeFieldset.css("display", "block");
  });
  app.$passNo.on("click", function () {
    app.$timeFieldset.css("display", "none");
  });
};

// read the radio button inputs
app.readInput = function () {
  const roomName = app.$roomName.val();
  const passBoolean = app.$passBoolean.val();
  const playerAmt = app.$playerAmt.val();
  const hintAmt = app.$hintAmt.val();
  const timePlayed = app.$timePlayed;

  if (
    roomName == undefined ||
    passBoolean == undefined ||
    playerAmt == undefined ||
    hintAmt == undefined
  ) {
    alert("Fill in required fields!");
  } else {
    if (timePlayed == "") {
      const noTime = "N/A";
      app.addScore(roomName, passBoolean, noTime, playerAmt, hintAmt);
    } else {
      const timeDuration = app.calculateTimeRemaining(roomName, timePlayed);
      app.addScore(roomName, passBoolean, timeDuration, playerAmt, hintAmt);
    }
  }
};

// create function that grabs data from db
app.fetchData = function () {
  fetchData();
};
app.addScore = function (name, pass, time, player, hint) {
  const roomData = {
    name: name,
    pass: pass,
    time: time,
    player: player,
    hint: hint,
  };
  $("input[type='radio']").prop("checked", false);
  $(".timePlayed").val("");

  // push object to database
  roomObj(roomData);
};

// time remaining calculator
app.calculateTimeRemaining = function (room, timeRemaining) {
  //   let seconds;
  //   let minutes;
  let remainingSeconds;
  let remainingMinutes;
  timeRemaining = timeRemaining.replace(":", "");

  if (timeRemaining.length <= 3) {
    timeRemaining = timeRemaining.padStart(4, "0");
  }

  const seconds = timeRemaining.slice(-2);
  const minutes = timeRemaining.slice(0, 2);

  if (seconds == "00") {
    remainingSeconds = seconds.padStart(2, "0");
    console.log(remainingSeconds);

    if (room === "The Last Laugh") {
      remainingMinutes = 75 - minutes;
    } else {
      remainingMinutes = 60 - minutes;
    }
  } else {
    remainingSeconds = 60 - seconds.padStart(2, "0");
    remainingSeconds = remainingSeconds.toString().padStart(2, "0");
    if (room === "The Last Laugh") {
      remainingMinutes = 74 - minutes;
    } else {
      remainingMinutes = 59 - minutes;
    }
  }

  const remainingTime = `${remainingMinutes}:${remainingSeconds}`;
  console.log(remainingTime);
  return remainingTime;
};

app.init = () => {
  console.log("initialized");
  app.addEventListener();
  fetchData();
};

$(() => {
  console.log("document ready");
  app.init();
});
