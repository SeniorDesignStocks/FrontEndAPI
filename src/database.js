const mongoose = require('mongoose');
const emoji = require('node-emoji');
const print = require('./print');
const config = require('./config/global.json');
console.log('\n\n\ntesting connection\n\n\n');

// janky way to solve docker race condition
setTimeout(() => {
  mongoose.connect(`mongodb://stocks-database/stocks`);

  const db = mongoose.connection;
  db.on('error', err => console.error(`${emoji.get('poop')}  connection error`, err));
}, 5000);
