const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/account', require('./account'));
router.use('/stockData', require('./stockData'));
router.use('/search', require('./search'));
router.use('/predict', require('./predict'));

module.exports = router;
