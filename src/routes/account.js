const router = require('express').Router();
const User = require('../models/user');

router.get('/:username/addFavorite/:stockName', (req, res) => {
  const { username, stockName } = req.params;

  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      return res.sendStatus(400);
    }

    const newFavorites = [ ...user.favorites, stockName ];
    User.findByIdAndUpdate(
      user._id, 
      { $push: { favorites: stockName } },
      { safe: true, upsert: true, new: true },
      (err) => {
        if (err) console.error(err)
      } 
    );

    return res.send({ favorites: newFavorites })
  });
});

router.get('/:username/removeFavorite/:stockName', (req, res) => {
  const { username, stockName } = req.params;

  User.findOne({ username }, (err, user) => {
    if (err || !user) {
      return res.sendStatus(400);
    }

    const filteredFavorites = user.favorites.filter(name => name !== stockName);
    User.findByIdAndUpdate(
      user._id,
      { $set: { favorites: filteredFavorites } },
      { safe: true, new: true },
      (err) => {
        if (err) console.error(err);
      }
    );

    return res.send({ favorites: filteredFavorites });
  })
})

module.exports = router;