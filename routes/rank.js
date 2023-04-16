const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, '../views' ));
app.use(express.static(__dirname + '../public'));
app.set('view engine', 'ejs');


  app.get('/newbie/:notification?', (req, res) => {
    const notification = req.params.notification;
    res.render('newbie',{notification : notification});
  });

  app.get('/beginner/:notification?', (req, res) => {
    const notification = req.params.notification;
    res.render('beginner',{notification : notification});
  });

  app.get('/amateur/:notification?', (req, res) => {
        const notification = req.params.notification;
    res.render('amateur',{notification : notification});
  });

  app.get('/semi-pro/:notification?', (req, res) => {
        const notification = req.params.notification;
    res.render('semi-pro',{notification : notification});
  });

  app.get('/professional/:notification?', (req, res) => {
        const notification = req.params.notification;
    res.render('professional',{notification : notification});
  });

  module.exports = app;

  
