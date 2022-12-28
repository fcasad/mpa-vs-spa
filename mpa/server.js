const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/pages/index.html');
});

app.get('/contact', function (req, res) {
  res.sendFile(__dirname + '/pages/contact.html');
});

app.post('/contact', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  // TODO: Do something like saving to database
  console.log('Received: ', name, email, message);
  res.redirect('/contact-received');
});

app.get('/contact-received', function (req, res) {
  res.sendFile(__dirname + '/pages/contact-received.html');
});

app.get('*', function (req, res) {
  res.status(404).sendFile(__dirname + '/pages/not-found.html');
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
