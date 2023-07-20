const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    required: true,
    type: String
  }
})

module.exports = model('User', userSchema);