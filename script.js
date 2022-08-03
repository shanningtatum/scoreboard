import roomObj from "./database.js";
import { fetchData } from "./database.js";

const app = {};

// query button for event listener
app.$submitButton = $(".submitButton");
app.$passYes = $("#passYes");
app.$passNo = $("#passNo");
app.$scrollButton = $(".scrollButton");

// query
app.$displayStats = $(".displayStats");
app.$timeFieldset = $(".timeFieldset");
app.$addSection = $(".add");
app.$authorization = $(".authorization");

// password form
app.$addLink = $(".addLink");
app.$password = $("#password");
app.$passwordSubmit = $(".passwordSubmit");
app.$closeIcon = $(".closeIcon");

// confirmation password

app.$successMessage = $(".successMessage");

// time and date grabber
let time;
let date;

// state
let userPass = false;

app.setTime = () => {
  const timestamp = new Date();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonth = months[timestamp.getMonth()];
  const currentDate = timestamp.getDate();
  const currentYear = timestamp.getFullYear();
  const currentHours = timestamp.getHours();
  const currentMinutes = timestamp.getMinutes();
  const timeOfDay = currentHours >= 12 ? "PM" : "AM";

  let hours = currentHours % 12;
  hours = hours ? hours : 12;

  date = `${currentMonth} ${currentDate}, ${currentYear}`;
  time = `${hours}:${currentMinutes.toString().padStart(2, "0")}${timeOfDay}`;
  return date + " " + time;
};

app.checkAuthorization = () => {
  app.$passwordSubmit.on("click", function (e) {
    if (app.$password.val() == "escape911") {
      e.preventDefault();
      app.$authorization.removeClass("active");
      app.$addSection.addClass("active");
    } else {
      alert("wrong password");
    }
  });
};

app.addEventListener = function () {
  app.$addLink.on("click", function () {
    app.$authorization.addClass("active");
    app.$closeIcon.on("click", function () {
      app.$authorization.removeClass("active");
    });
    app.checkAuthorization();
  });

  $(window).on("scroll", function () {
    if (scrollY > 10) {
      app.$scrollButton.css("display", "block");
    } else {
      app.$scrollButton.css("display", "none");
    }
  });

  app.$scrollButton.on("click", function () {
    window.scrollTo(0, 0);
  });

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
    userPass = true;
  });
  app.$passNo.on("click", function () {
    app.$timeFieldset.css("display", "none");
    userPass = false;
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
    hintAmt == undefined ||
    (userPass == true) & (timePlayed == "")
  ) {
    alert("Fill in all the fields!");
  } else {
    if (timePlayed == "") {
      const stamp = app.setTime();
      const noTime = "N/A";
      app.addScore(stamp, roomName, passBoolean, noTime, playerAmt, hintAmt);
    } else {
      const stamp = app.setTime();
      const timeDuration = app.calculateTimeRemaining(roomName, timePlayed);
      app.addScore(
        stamp,
        roomName,
        passBoolean,
        timeDuration,
        playerAmt,
        hintAmt
      );
    }
  }
};

// create function that grabs data from db
app.fetchData = function () {
  fetchData();
};

app.addScore = function (date, name, pass, time, player, hint) {
  const roomData = {
    date: date,
    name: name,
    pass: pass,
    time: time,
    player: player,
    hint: hint,
  };
  $("input[type='radio']").prop("checked", false);
  $(".timePlayed").val("");
  app.$timeFieldset.css("display", "none");
  app.$successMessage.addClass("active");

  setTimeout(() => {
    app.$successMessage.removeClass("active");
  }, 5000);

  // push object to database

  roomObj(roomData);

  // refresh page
  // location.reload();
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
  return remainingTime;
};

app.init = () => {
  app.addEventListener();
  app.fetchData();
};

$(() => {
  app.init();
});
