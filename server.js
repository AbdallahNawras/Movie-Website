/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name:
 * Email:
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3001;

var postData = require('./postData');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', function (req, res, next) {
    console.log("== client requesting '/'");
    res.status(200).render('postPage', postData);
});

app.get('/posts/:n', function (req, res, next) {
    var index = req.params.n;
    console.log("== client requesting '/posts/" + index + "'");

    if (index >= 0 && index <= 7) { res.status(200).render('partials/post', postData[index]); }
    else { next(); }
});

app.get('*', function (req, res) {
  console.log("== client requesting non-existing directory.");
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});