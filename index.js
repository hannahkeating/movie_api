/*jshint esversion: 6*/

const express = require("express"),
  morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//express.static
//"documentation.html" file from public folder
app.use(express.static("public"));
//Morgan middleware function to log all requests
app.use(morgan("common"));
app.use(bodyParser.json());

//List of all movies
app.get("/", function (req, res) {
  res.send("Welcome to Flix Fix!");
});
app.get("/movies", function (req, res) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get information about a movie by title
app.get("/movies/:Title", function (req, res) {
  Movies.findOne({ Title: req.params.Title })
    .then(function (movies) {
      res.json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get data about a director
app.get("/movies/directors/:Name", function (req, res) {
  Movies.findOne({ "Director.Name": req.params.Name })
    .then(function (movies) {
      res.json(movies);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get data about a genre by name
app.get("/movies/genres/:Name", function (req, res) {
  Movies.findOne({ "Genre.Name": req.params.Name })
    .then(function (movies) {
      res.json(movies.Genre);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//user endpoints
//get a list of users
app.get("/users", function (req, res) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//get a user by username
app.get("/users/:Username", function (req, res) {
  Users.findOne({ Username: req.params.Username })
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//add user
/*We'll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthdate: Date
}*/
app.post("/users", function (req, res) {
  Users.findOne({ Username: req.body.Username })
    .then(function (user) {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then(function (user) {
            res.status(201).json(user);
          })
          .catch(function (error) {
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Update a user's info by username
/*We'll expect JSON in this format
{
  Username: String, (required)
  Password: String, (required)
  Email: String, (required)
  Birthday: Date
}*/
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Birthday,
      },
    },
    { new: true }, //This Line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// Delete a user by username
app.delete("/users/:Username", function (req, res) {
  Users.findByIdAndRemove({ Username: req.params.Username })
    .then(function (user) {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found.");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).send("Eroor: " + err);
    });
});

// Add a movie to a user's list of favorites
app.post("users/:Username/Movies/:MovieID", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieID },
    },
    { new: true }, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      }
    }
  );
});

//delete movie from user's list of favorites
app.delete("/users/:Username/Movies/:MovieID", function (req, res) {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true },
    function (err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

app.listen(3000, function () {
  console.log("Your app is listening on port 3000.");
});
