'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a mongoose model
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// This is the "pre-hook."
usersSchema.pre('save', async function() {
  //checks to see whether the password has changed
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  };
})

// This is the function that verifies the user. 
usersSchema.statics.authenticateBasic = async function(username, password) { 
  const user = await this.findOne({ username });
  const valid = await bcrypt.compare(password, user.password);
  if(valid) { return user; };
  throw new Error('Invalid user.');
}

// Makes this a model to be exported and used eslewhere.
module.exports = mongoose.model('users', usersSchema);
