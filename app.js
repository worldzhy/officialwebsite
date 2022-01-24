const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/*', function(req, res) {
  res.json(req.body);
});

app.listen(3580, () => {
  console.log('App listening at port 3580');
});
