const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();

app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

let users = [];
let lastIndex = users.length;

app.post("/addUser", async (req, res) => {
  const { password } = req.body;
  if (password.length >= 8) {
    req.body.id = String(++lastIndex);
    const hashPassword = await bcrypt.hash(password, 8);
    req.body.password = hashPassword;
    users.push(req.body);
    //console.log(users);
    res.render("message.ejs", { message: "Registration success" });
  } else {
    res.render("message.ejs", { message: "Registration failed" });
  }
});

app.listen(8080, () => console.log(`app running on port 8080`));
