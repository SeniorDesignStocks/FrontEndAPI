const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const defString = { type: String, unique: true, required: true };
const userSchema = mongoose.Schema({
  username: defString, 
  email: defString,
  password: { type: String, required: true },
  favorites: Array,
});

module.exports = mongoose.model('User', userSchema);