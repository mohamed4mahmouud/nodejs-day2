const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(express.json());

let cars = [{ number: 1, license: "BM12", model: "BMW" }];

let lastIndex = cars.length;

app.get("/getOneCar", (req, res) => {
  const { number } = req.query;
  const car = cars.find((car) => car.number == number);

  const body = {
    data: car,
  };

  if (!car) {
    body.message = "failed";
  } else {
    body.message = "success";
  }

  const html = `
  <h2>Car Details</h2>
  <p>Number: ${car.number}</p>
  <p>Model: ${car.model}</p>
  <p>License: ${car.license}</p>
`;
  res.send(html);
});

app.get("/getAllCars", (req, res) => {
  res.send({ data: cars });
});

app.post("/addCar", (req, res) => {
  const car = req.body;
  req.body.number = ++lastIndex;
  cars.push(car);
  const body = {
    message: "Success",
  };
  res.send(body);
});

app.get("/deleteCar/:number", (req, res) => {
  const { number } = req.params;
  const carIndex = cars.findIndex((car) => car.number == number);
  const body = {};
  if (carIndex >= 0) {
    cars.splice(carIndex, 1);
    body.message = "Success";
  } else {
    body.message = "Not Found";
  }
  res.send(body);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "\\index.html");
});

app.use(express.static(__dirname));

app.listen(8081, () => console.log("App running on port 8081"));
