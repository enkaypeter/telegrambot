var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require("dotenv").config();
const axios = require("axios");
let url =
  "https://api.telegram.org/bot" +
  process.env.TELEGRAM_API_TOKEN +
  "/sendMessage";
app.use(bodyParser.json()); // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
console.log(url);
app.post("/new-message", function(req, res) {
  const { message } = req.body;
  console.log(message);
  if (!message || message.text.toLowerCase().indexOf("hey") < 0) {
    return res.end();
  }

  axios
    .post(url, {
      chat_id: message.chat.id,
      text: "Hey Babe"
    })
    .then(response => {
      console.log("Message posted");
      res.end("ok");
    })
    .catch(err => {
      console.log("Error : ", err);
      res.end("Error : " + err);
    });
});
app.listen(3000, () => console.log("Telegram bot is  listening on port 3000!"));
