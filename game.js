var character = document.getElementById("character");
var block = document.getElementById("block");
var lastUpdated = new Date().getTime();

document.addEventListener("keyup", function (e) {
  if (e.keyCode === 32 && new Date().getTime() > lastUpdated + 475) {
    jump();
    lastUpdated = new Date().getTime();
  }
});

function jump() {
  character.classList.add("animate");
  setTimeout(function () {
    character.classList.remove("animate");
  }, 500); // Removes animation after 0.5 seconds after triggering it.
}
