// Create web socket connection
const socket = new WebSocket("ws://localhost:3000");

let audio = "";

// Listen for messages
socket.addEventListener("message", function (event) {
  audio = event.data.toString();
  playAudio(audio);
});

// Send channel name
const sendChannelName = () => {
  var channelName = document
    .getElementById("twitchChannelName")
    .value.toString();
  socket.send(channelName);
};

// Play audio
function playAudio(link) {
  // Create audio element
  var audio = document.createElement("audio");
  audio.src = link;
  document.getElementById("audioDiv").appendChild(audio);
  audio.play();

  audio.onended = function () {
    this.parentNode.removeChild(this);
  };
}

function showDiv() {
  document.getElementById("startScreen").remove();
  document.getElementById("channelDetails").style.display = "block";
  document.getElementById("audioDiv").style.display = "block";
}
