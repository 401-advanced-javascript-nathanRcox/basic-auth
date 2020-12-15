'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// const base64 = require('base-64');
const signInMiddleware = require('../auth/sign-in-auth');
const Users = require('../models/schema');

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', async (req, res) => {
  try {
      console.log('REQ.BODY:', req.body);
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new Users(req.body);
      console.log('USER:', user);
      const record = await user.save(req.body);
      console.log('RECORD:', record);
      res.status(200).json(record);
    } catch(e) { res.status(403).send("Error Creating User"); }
});

// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
router.post('/signin', signInMiddleware);

module.exports = router;
