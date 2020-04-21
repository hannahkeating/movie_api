/*jshint esversion: 6*/

const express = require('express'),
  morgan = require('morgan');
const app = express();

//express.static
//"documentation.html" file from public folder
app.use(express.static('public'));
//Morgan middleware function to log all requests
app.use(morgan('common'));

//GET requests
app.get('/', function(req, res) {
  res.send('Welcome to Flix Fix!')
});
app.get('/movies', function(req, res) {
  res.json(movies)
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
