const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  user_id: {
    required: true,
    type: String
  },
  username: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  duration: {
    required: true,
    type: Number
  },
  date: Date
});

module.exports = model('Exercise', exerciseSchema);