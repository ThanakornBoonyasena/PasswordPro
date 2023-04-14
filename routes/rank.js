const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, '../views' ));
app.use(express.static(__dirname + '../public'));
app.set('view engine', 'ejs');


app.get('/newbie', (req, res) => {
    const status = ""
    res.render('newbie',{status:status});
  });

  app.get('/beginner', (req, res) => {
    const status = ""
    res.render('beginner',{status:status});
  });

  app.get('/amateur', (req, res) => {
    res.render('amateur');
  });

  app.get('/semi-pro', (req, res) => {
    res.render('semi-pro');
  });

  app.get('/professional', (req, res) => {
    res.render('professional');
  });

  module.exports = app;

  
