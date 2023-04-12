const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded ({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
  });

app.listen(8080 ,() => console.log("Server is running"))