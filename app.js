const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const WebSocket = require("ws");
const tmi = require("tmi.js");
require("dotenv").config();

const url = process.env.URL;

app.use(express.static(path.join(__dirname + "/public")));

const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  // Incoming messages
  ws.on("message", function incoming(channel) {
    var channelName = channel;
    const client = new tmi.Client({
      channels: [channelName],
    });

    client.connect();

    client.on("message", (channel, tags, message, self) => {
      message.trim();
      var mesg = message.toString().toLowerCase();
      var audio = url + mesg;
      ws.send(audio);
      console.log(`${tags["display-name"]}: ${message}`);
      console.log(`${channel}`);
    });
  });
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
