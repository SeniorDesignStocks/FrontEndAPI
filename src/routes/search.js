const router = require('express').Router();
const stockCache = require('../stockCache');

let stocks = [];
stockCache.then(data => { stocks = data; });

router.get('/:term', (req, res) => {
  const { term } = req.params;
  const filteredStocks = stocks.filter(
    stock => stock.symbol.includes(term.toUpperCase())
  );

  res.send(filteredStocks);
})

module.exports = router;