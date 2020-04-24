/*jshint esversion: 6*/

const express = require("express"),
  morgan = require("morgan");
const app = express();

//express.static
//"documentation.html" file from public folder
app.use(express.static("public"));
//Morgan middleware function to log all requests
app.use(morgan("common"));

let movies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer",
  },
];
//GET requests
app.get("/", function (req, res) {
  res.send("Welcome to Flix Fix!");
});
app.get("/movies", function (req, res) {
  res.json(movies);
});
app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
