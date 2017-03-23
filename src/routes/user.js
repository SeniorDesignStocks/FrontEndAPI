const router = require('express').Router();
const emoji = require('node-emoji');
const User = require('../models/user');

const publicFilter = ({ username, email, favorites }) => ({
  user: {
    username,
    email,
    favorites,
  },
});

router.get('/login', (req, res) => {
  const {
    username,
    password,
  } = req.query;

  User.findOne({ username, password }, (err, user) => {
    if (err) {
      console.error(err);
    }

    if (user) {
      return res.send(publicFilter(user));
    }

    return res.sendStatus(400);
  })
});

router.get('/logout', (req, res) => {
  // does not do anything yet
});

router.get('/register', (req, res) => {
  const { 
    username,
    password,
    email,
  } = req.query;

  // checks against the params
  if (username.length < 4) {
    return res.sendStatus(400);
  }

  const newUser = new User({
    username,
    password,
    email,
    favorites: [],
  });


  newUser.save((err) => {
    if (err) {
      console.log(`${emoji.get('poop')}  Failed to add new user: { username: ${username}, email: ${email} }`);

      return res.sendStatus(400);
    }

    return res.send(publicFilter(user));
  });
});

module.exports = router;
