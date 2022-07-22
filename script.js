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
    app.readInput();
    // clear radio inputs
  });
};

app.readInput = function () {
  const roomName = app.$roomName.val();
  const passBoolean = app.$passBoolean.val();
  const playerAmt = app.$playerAmt.val();
  const hintAmt = app.$hintAmt.val();
  app.addScore(roomName, passBoolean, playerAmt, hintAmt);

  console.log(roomName, passBoolean, playerAmt, hintAmt);
};
app.addScore = function (name, pass, player, hint) {
  app.$displayStats.append(
    `<ul>
        <li>${name}</li>
        <li>${pass}</li>
        <li>${player}</li>
        <li>${hint}</li>
    </ul>`
  );
  $("input[type='radio']").prop("checked", false);
};

app.init = () => {
  console.log("initialized");
  app.addEventListener();
};

$(() => {
  console.log("document ready");
  app.init();
});
