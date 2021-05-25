var character = document.getElementById("character");
var block = document.getElementById("block");
var lastUpdated = new Date().getTime();
var counter = 0;

jumpSound = () => {
  let jumpAudio = new Audio("./Audio/Jump.wav");
  jumpAudio.loop = false;
  jumpAudio.volume = 0.5;
  jumpAudio.play();
};

carCrashSound = () => {
  let carCrashAudio = new Audio("./Audio/carCrash.wav");
  carCrashAudio.loop = false;
  carCrashAudio.volume = 0.3;
  carCrashAudio.play();
};

jump = () => {
  if (character.classList != "jump-animate") {
    character.classList.add("jump-animate");
    document.getElementById("Opening-message").style.visibility = "hidden";
    jumpSound();
  }
  setTimeout(() => {
    character.classList.remove("jump-animate");
  }, 500); // Removes animation after 0.5 seconds after triggering it.
};

document.addEventListener("keyup", (e) => {
  if (e.keyCode === 32 && new Date().getTime() > lastUpdated + 400) {
    jump();
    lastUpdated = new Date().getTime();
  }
});

increaseBlockSpeed = () => {
  var score = Math.floor(counter / 100);
  if (score === 0 || score < 10) {
    block.classList.add("block-animate");
  } else if (score === 10 || score < 30) {
    block.classList.remove("block-animate");
    block.classList.add("block-animate-2");
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
};

recordScore = () => {
  var allScores = JSON.parse(localStorage.allScores || "[]");
  allScores.push(Math.floor(counter / 100));
  localStorage.setItem("allScores", JSON.stringify(allScores));
  var allScores = localStorage.getItem("allScores");
  var allScores = JSON.parse(allScores);
  var maxScore = allScores.sort((a, b) => {
    return b - a;
  })[0];
  document.getElementById("topScore").innerHTML = maxScore;
};

let checkDead = setInterval(() => {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 90 && blockLeft > 0 && characterTop >= 140) {
    block.style.animation = "none";
    line.style.animation = "none";
    character.style.animation = "none";
    document.getElementById("scoreBoard").style.visibility = "hidden";
    alert("You Crashed: You scored " + Math.floor(counter / 100));
    carCrashSound();
    recordScore();
  } else {
    counter++;
    increaseBlockSpeed();
    document.getElementById("scoreBoard").innerHTML = Math.floor(counter / 100);
  }
}, 10);
