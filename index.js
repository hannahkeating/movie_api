/*jshint esversion: 6*/

const express = require("express"),
  morgan = require("morgan");
const app = express();

//express.static
//"documentation.html" file from public folder
app.use(express.static("public"));
//Morgan middleware function to log all requests
app.use(morgan("common"));

let users = [
  {
    id: 1,
    Username: "Hannah Keating",
    Password: "1234",
    Email: "h.monet1104@gmail.com",
    Birthday: "11/04/1990",
    FavoriteMovies: [],
  },
  {
    id: 2,
    Username: "Natasha Keating",
    Password: "5678",
    Email: "h.monet1104@yahoo.com",
    Birthday: "11/04/1990",
    FavoriteMovies: [],
  },
  {
    id: 3,
    Username: "Sean Keating",
    Password: "5555",
    Email: "seank@gmail.com",
    Birthday: "11/04/1990",
    FavoriteMovies: [],
  },
];
let movies = [
  {
    id: 1,
    Title: "Silence of the Lambs",
    Description:
      "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    Genre: {
      Name: "Thriller",
      Description:
        "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
    },
    Director: {
      Name: "Jonathan Demme",
      Bio:
        "Robert Jonathan Demme was an American director, producer, and screenwriter.",
      Birth: "1944",
      Death: "2017",
    },

    ImagePath:
      "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,677,1000_AL_.jpg",
    Featured: true,
  },
  {
    id: 2,
    Title: "Silence of the Lambs",
    Description:
      "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    Genre: {
      Name: "Thriller",
      Description:
        "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
    },
    Director: {
      Name: "Jonathan Demme",
      Bio:
        "Robert Jonathan Demme was an American director, producer, and screenwriter.",
      Birth: "1944",
      Death: "2017",
    },

    ImagePath: "silenceofthelambs.png",
    Featured: true,
  },
  {
    id: 3,
    Title: "Lambs",
    Description:
      "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    Genre: {
      Name: "Thriller",
      Description:
        "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
    },
    Director: {
      Name: "Jonathan Demme",
      Bio:
        "Robert Jonathan Demme was an American director, producer, and screenwriter.",
      Birth: "1944",
      Death: "2017",
    },

    ImagePath: "silenceofthelambs.png",
    Featured: true,
  },
  {
    id: 4,
    Title: "Silence of the Lambs",
    Description:
      "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    Genre: {
      Name: "Romance",
      Description:
        "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
    },
    Director: {
      Name: "Jonathan Demme",
      Bio:
        "Robert Jonathan Demme was an American director, producer, and screenwriter.",
      Birth: "1944",
      Death: "2017",
    },

    ImagePath: "silenceofthelambs.png",
    Featured: true,
  },
];

//GET requests
app.get("/", function (req, res) {
  res.send("Welcome to Flix Fix!");
});
app.get("/movies", function (req, res) {
  res.json(movies);
});
app.get("/movies/:Title", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.Title === req.params.Title;
    })
  );
});
app.get("/movies/director/:Name", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.Director.Name === req.params.Name;
    })
  );
});

app.get("/movies/genres/:Name", (req, res) => {
  res.json(
    movies.find((movie) => {
      return movie.Genre.Name === req.params.Name;
    })
  );
});
//User endpoints

//adds user
app.post("/users", (req, res) => {
  res.status(500).send("User added!");
});

//updates user information
app.put("/users/:Username", (req, res) => {
  res.json(
    users.find((user) => {
      return user.Username === req.params.Username;
    })
  );
});

//allows user to add movie to favorites
app.post("users/:Username/favorites", (req, res) => {
  res.status(500).send("Succesfully added movie to favorites!");
});

//allows user to remove movie from favorites
app.delete("users/:Username/favorites", (req, res) => {
  res.status(500).send("Successfully removed movie from favorites.");
});

//allows user to deregister
app.delete("/users/:Email", (req, res) => {
  res.status(500).send("User Deleted.");
});

app.get("/documentation", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Your app is listening on port 3000.");
});
