const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());

let database = [];
let id = 0;
let userId = 0;
let userDatabase = [];

app.all("*", (req, res, next) => {
  const method = req.method;
  console.log(`Method ${method} is aangeroepen`);
  next();
});

// GET HELLO WORLD
app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    result: "Hello World!",
  });
});

// ADD MOVIE
app.post("/api/movie", (req, res) => {
  let movie = req.body;
  id++;
  movie = {
    id,
    ...movie,
  };
  console.log(movie);
  database.push(movie);
  res.status(201).json({
    status: 201,
    result: database,
  });
});

// GET MOVIE BY ID
app.get("/api/movie/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  console.log(`Movie met ID ${movieId} gezocht`);
  let movie = database.filter((item) => item.id == movieId);
  if (movie.length > 0) {
    console.log(movie);
    res.status(200).json({
      status: 200,
      result: movie,
    });
  } else {
    res.status(401).json({
      status: 401,
      result: `Movie with ID ${movieId} not found`,
    });
  }
});

// GET MOVIES
app.get("/api/movie", (req, res, next) => {
  res.status(200).json({
    status: 200,
    result: database,
  });
});

// END POINT NOT FOUND
app.all("*", (req, res) => {
  res.status(401).json({
    status: 401,
    result: "End-point not found",
  });
});

// LISTENER LOG
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



// ADD NEW USER
app.post("/api/user", (req, res) => {
  let user = req.body;
  userId++;
  user = {
    userId,
    ...user,
  };
  console.log(user);
  if (database.find(user) == null){
    userDatabase.push(user);
    res.status(201).json({
      status: 201,
      result: userDatabase,
    });
  }
  else {
    res.status(401).json({
      status: 401,
      result: `user already exists`,
    });
  }

});

// GET USERS
app.get("/api/user", (req, res) => {
  res.status(200).json({
    status: 200,
    result: userDatabase,
  });
});

// GET USER PROFILE (returns error code 401)
app.get("/api/user/profile", (req, res) => {
  res.status(401).json({
    status: 401,
    result: `Unable to retrieve user profile`,
  });
});

// GET USER BY ID
app.get("/api/movie/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log(`User met ID ${userId} gezocht`);
  let user = userDatabase.filter((item) => item.id == userId);
  if (user.length > 0) {
    console.log(user);
    res.status(200).json({
      status: 200,
      result: user,
    });
  } else {
    res.status(401).json({
      status: 401,
      result: `user with ID ${userId} not found`,
    });
  }
});

// UPDATE USER
app.put("/api/user/:userId", (req, res, next) => {
  const userId = req.params.userId;
  console.log(`User met ID ${userId} gezocht`);
  let user = userDatabase.filter((item) => item.id == userId);
  if (user != null){
    userDatabase.push(req.body);
  } else {
    res.status(401).json({
      status: 401,
      result: `user with ID ${userId} not found`,
    });
  }
});

// DELETE USER
app.delete("/api/user/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log(`User met ID ${userId} gezocht`);
  let user = userDatabase.filter((item) => item.id == userId);
  if (user != null){
    userDatabase.delete(userId);
  } else {
    res.status(401).json({
      status: 401,
      result: `user with ID ${userId} not found`,
    });
  }
});