const router = require('express').Router();
const fetch = require('node-fetch');

const getPred = (stockName) => fetch(`http://stockssimplified.ddns.net:4567/predict/${stockName}`)

router.get('/stock/:stockName', (req, res) => {
  const { stockName } = req.params;

  getPred(stockName)
    .then(response => response.json())
    .then(response => res.send(response))
    .catch(err => res.sendStatus(400));
});

router.get('/stocks', (req, res) => {
  const { stocks } = req.query;
  const list = stocks.split(',').map(stock => getPred(stock));
  const output = [];

  list.forEach((prom) => {
    prom.then(response => response.json()).then(response => output.push(response));
  });

  setTimeout(() => {
    res.send(output);
  }, 250);
})

module.exports = router;