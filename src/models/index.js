const mongoose = require('mongoose');
const { User } = require('./user');
const { Mate } = require('./mate');

// mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
});

module.exports = {
  Mate,
  User,
};
