const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const ranks = require('./routes/rank');
const cri = require('./routes/criticize');

app.use(express.urlencoded ({extended: true}));
app.set('views', path.join(__dirname, 'views' ));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
  });

app.use('/play', ranks);

app.use('/cri', cri);

app.get('/news', (req, res) => {
    res.render('news');
  });

app.get('/about', (req, res) => {
    res.render('about');
  });

app.get('/play', (req, res) => {
    res.render('play');
  });


app.listen(8080 ,() => console.log("Server is running"))