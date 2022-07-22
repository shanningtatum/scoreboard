import roomObj from "./database.js";

const app = {};

// query button for event listener
app.$submitButton = $(".submitButton");

// query display stat class
app.$displayStats = $(".displayStats");

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
};

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
      const timeDuration = app.calculateTimeRemaining(timePlayed);
      app.addScore(roomName, passBoolean, timeDuration, playerAmt, hintAmt);
    }
  }
};

app.addScore = function (name, pass, time, player, hint) {
  app.$displayStats.prepend(
    `<ul>
        <li>${name}</li>
        <li>${pass}</li>
        <li>${time}</li>
        <li>${player}</li>
        <li>${hint}</li>
    </ul>`
  );

  const roomData = {
    name: name,
    pass: pass,
    time: time,
    player: player,
    hint: hint,
  };
  $("input[type='radio']").prop("checked", false);
  $(".timePlayed").val("");
  //   roomObj(roomData);
};

// time remaining calculator
app.calculateTimeRemaining = function (timeRemaining) {
  let seconds;
  let minutes;
  let remainingSeconds;
  let remainingMinutes;
  timeRemaining = timeRemaining.replace(":", "");

  if (timeRemaining.length <= 3) {
    timeRemaining = timeRemaining.padStart(4, "0");
  }

  const spliceSecond = timeRemaining.slice(-2);
  const spliceMinute = timeRemaining.slice(0, 2);

  if (spliceSecond == "00") {
    remainingSeconds = spliceSecond.padStart(2, "0");
    console.log(remainingSeconds);
    remainingMinutes = 60 - spliceMinute;
  } else {
    remainingSeconds = 60 - spliceSecond.padStart(2, "0");
    remainingSeconds = remainingSeconds.toString().padStart(2, "0");
    remainingMinutes = 59 - spliceMinute;
  }

  const remainingTime = `${remainingMinutes}:${remainingSeconds}`;
  console.log(remainingTime);
};

app.init = () => {
  console.log("initialized");
  app.addEventListener();
};

$(() => {
  console.log("document ready");
  app.init();
});
