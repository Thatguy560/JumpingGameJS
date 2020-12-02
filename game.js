var character = document.getElementById("character");
var block = document.getElementById("block");
var lastUpdated = new Date().getTime();
var counter = 0;

jump = () => {
  if (character.classList != "jump-animate") {
    character.classList.add("jump-animate");
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

function keepScore() {
  var maxScore = JSON.parse(localStorage.maxScore || "[]");
  maxScore.push(Math.floor(counter / 100));
  localStorage.setItem("maxScore", JSON.stringify(maxScore));
  var maxScore = localStorage.getItem("maxScore");
  var maxScore = JSON.parse(maxScore);
  document.getElementById("topScore").innerHTML = maxScore.sort((a, b) => {
    return b - a;
  })[0];
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
    line.style.animation = "none";
    character.style.animation = "none";
    document.getElementById("scoreBoard").style.visibility = "hidden";
    keepScore();
    alert("You Crashed: Your score is " + Math.floor(counter / 100));
  } else {
    counter++;
    document.getElementById("scoreBoard").innerHTML = Math.floor(counter / 100);
  }
}, 10);
