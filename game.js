var character = document.getElementById("character");
var block = document.getElementById("block");
var lastUpdated = new Date().getTime();
var counter = 0;

jump = () => {
  if (character.classList != "jump-animate") {
    character.classList.add("jump-animate");
    var jumpAudio = new Audio("528568__evan-schad__8-bit-jump-3 (1).wav");
    jumpAudio.loop = false;
    jumpAudio.play();
  }
  setTimeout(function () {
    character.classList.remove("jump-animate");
  }, 500); // Removes animation after 0.5 seconds after triggering it.
};

document.addEventListener("keyup", function (e) {
  if (e.keyCode === 32 && new Date().getTime() > lastUpdated + 400) {
    jump();
    lastUpdated = new Date().getTime();
  }
});

// moveDown = () => {
//   character.style.top = 200 + "px";
// };

// document.addEventListener("keydown", function (e) {
//   if (e.keyCode === 40) {
//     moveDown();
//   }
// });

// moveUp = () => {
//   character.style.top = 150 + "px";
// };

// document.addEventListener("keyup", function (e) {
//   if (e.keyCode === 38) {
//     moveUp();
//   }
// });

function increaseBlockSpeed() {
  let score = Math.floor(counter / 100);
  if (score === 0 || score < 10) {
    block.classList.add("block-animate");
  } else if (score === 10 || score < 30) {
    block.classList.remove("block-animate");
    block.classList.add("block-animate-2");
    document.getElementById("test").style.visibility = "hidden";
  } else if (score === 30 || score < 51) {
    block.classList.remove("block-animate-2");
    block.classList.add("block-animate-3");
    document.getElementById("scoreBoard").style.color = "#cd7f32";
  } else if (score === 51 || score < 100) {
    block.classList.remove("block-animate-3");
    block.classList.add("block-animate-4");
    document.getElementById("scoreBoard").style.color = "#7c8288";
  } else {
    block.classList.remove("block-animate-4");
    block.classList.add("block-animate-max");
    document.getElementById("scoreBoard").style.color = "#FFD700";
  }
}

function keepScore() {
  var allScores = JSON.parse(localStorage.allScores || "[]");
  allScores.push(Math.floor(counter / 100));
  localStorage.setItem("allScores", JSON.stringify(allScores));
  var allScores = localStorage.getItem("allScores");
  var allScores = JSON.parse(allScores);
  var maxScore = allScores.sort((a, b) => {
    return b - a;
  })[0];
  document.getElementById("topScore").innerHTML = maxScore;
}

function gameOver() {
  var carCrashAudio = new Audio(
    "151624__qubodup__clank-car-crash-collision (1).wav"
  );
  carCrashAudio.loop = false;
  carCrashAudio.play();
}

var checkDead = setInterval(function () {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 90 && blockLeft > 0 && characterTop >= 140) {
    block.style.animation = "none";
    gameOver();
    line.style.animation = "none";
    character.style.animation = "none";
    document.getElementById("scoreBoard").style.visibility = "hidden";
    keepScore();
    alert("You Crashed: You scored " + Math.floor(counter / 100));
  } else {
    counter++;
    increaseBlockSpeed();
    document.getElementById("scoreBoard").innerHTML = Math.floor(counter / 100);
  }
}, 10);
