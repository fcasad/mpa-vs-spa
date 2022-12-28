const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  // TODO: Do something like saving to database
  console.log(name + ' at ' + email + ' said: ' + message);
  res.sendStatus(201);
});

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/pages/index.html');
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});
