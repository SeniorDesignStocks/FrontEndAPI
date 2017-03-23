const router = require('express').Router();
const moment = require('moment');
const yf = require('yahoo-finance');
const stockCache = require('../stockCache');

let stocks = [];
stockCache.then(data => { stocks = data; });

router.get('/:stockName/current', (req, res) => {
  const { stockName } = req.params;

  const stockData = stocks.find(stock => stock.symbol === stockName);

  if (stockData) {
    return res.send(stockData);
  }

  return res.sendStatus(400);
});

router.get('/:stockName/historic', (req, res) => {
  const { stockName } = req.params;

  yf.historical({
    symbol: stockName,
    from: '2014-03-01',
    to: moment(new Date()).format('YYYY-MM-DD'),
    period: 'd',
  }, (err, quotes) => {
    if (err) {
      res.sendStatus(400);
    }

    res.send(quotes);
  });
});

module.exports = router;