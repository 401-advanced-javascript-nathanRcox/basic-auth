'use strict';

require('dotenv').config();
const server = require('./src/server');

const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGODB_URI, options)  
  .then(() => {
    server.start(process.env.PORT);

  })
  .catch(e => console.error('Could not start server', e.message));

