'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const router = require('./routes/signin-signup');

// Prepare the express app
const app = express();
app.use(cors());

// Process JSON input and put the data on req.body
app.use(express.json());

// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Where\'s the beef?'); };
    app.listen(port, () => console.log(`Order up on ${port}`))
    .catch(err => console.error('Server failed to start.', err));
  }
}
