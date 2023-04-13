const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded ({extended: true}));
app.set('views', path.join(__dirname, 'views' ));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
  });

app.post('/newbie-send', (req, res) => {
  const password = req.body;
  console.log(password)
  const passwordlist = Object.values(password);
  console.log(passwordlist)
  let status = ""
     if (passwordlist.length == 6) {
      status = "ผ่าน"
      res.render('beginer');
     } else {
      status = "ไม่ผ่าน"
      res.render('newbie',{status:status});
     }
});

app.get('/news', (req, res) => {
    res.render('news');
  });

app.get('/about', (req, res) => {
    res.render('about');
  });

app.get('/play', (req, res) => {
    res.render('play');
  });

  app.get('/newbie', (req, res) => {
    const status = ""
    res.render('newbie',{status:status});
  });

  app.get('/beginer', (req, res) => {
    res.render('beginer');
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

app.listen(8080 ,() => console.log("Server is running"))