const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 8888;
const cors = require("cors");

app.use(cors());
// connect mysql
const con = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "nhietdodoam",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app
  .route("/product")
  .get(function (req, res) {
    let sql = "SELECT * FROM sensordata ORDER BY ID DESC LIMIT 1";
    con.query(sql, (err, response) => {
      if (err) {
        res.send({ status: "error", message: err });
      } else {
        res.send({ status: "success", data: response });
      }
    });
  });

app.listen(port);
console.log("Server started at http://localhost:" + port);