var character = document.getElementById("character");
var block = document.getElementById("block");
var lastUpdated = new Date().getTime();
var counter = 0;
var maxScore = [];

document.addEventListener("keyup", function (e) {
  if (e.keyCode === 32 && new Date().getTime() > lastUpdated + 400) {
    jump();
    lastUpdated = new Date().getTime();
  }
});

function startGame() {}

function jump() {
  if (character.classList != "jump-animate") {
    character.classList.add("jump-animate");
  }
  setTimeout(function () {
    character.classList.remove("jump-animate");
  }, 500); // Removes animation after 0.5 seconds after triggering it.
}

function reset() {}

var checkDead = setInterval(function () {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 90 && blockLeft > 0 && characterTop >= 140) {
    block.style.animation = "none";
    block.style.display = "none";
    line.style.animation = "none";
    line.style.display = "none";
    alert("You Crashed: Your score is " + Math.floor(counter / 100));
    maxScore.push(Math.floor(counter / 100));
    document.getElementById("scoreBoard").style.visibility = "hidden";
    document.getElementById("topScore").innerHTML = maxScore.sort(
      (a, b) => b - a
    )[0];
    counter = 0;
  } else {
    counter++;
    document.getElementById("scoreBoard").innerHTML = Math.floor(counter / 100);
  }
}, 10);

// document.getElementsByTagName("h2")[0].innerHTML = "Current Score: 0";
// console.log(maxScore.sort((a, b) => b - a)[0]);
