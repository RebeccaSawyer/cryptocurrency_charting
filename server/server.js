const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jsonParse = bodyParser.json();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;
const axios = require("axios");

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/../public/")));

app.get("/prices", function(req, res) {
  //https://api.coindesk.com/v1/bpi/historical/close.json
  axios({
    method: "get",
    url: "https://api.coindesk.com/v1/bpi/historical/close.json",
    responseType: "application/json",
    contentType: "application/json"
  })
    .then(response => {
      console.log(typeof response.data.bpi);
      let stringData = JSON.stringify(response.data.bpi)
        .slice(1, -1)
        .split(",");
      let newData = [];
      for (let i = 0; i < stringData.length; i++) {
        let objEl = {};
        let arrayEl = stringData[i].split(":");
        objEl[arrayEl[0].slice(1, -1)] = arrayEl[1];
        newData.push(objEl);
      }
      res.send(newData);
    })
    .catch(err => {
      console.log(err);
    });
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/../public/index.html"));
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
