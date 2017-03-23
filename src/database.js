const mongoose = require('mongoose');
const emoji = require('node-emoji');
const print = require('./print');
mongoose.connect('mongodb://localhost/StocksSimplified');

const db = mongoose.connection;
db.on('error', err => console.error(`${emoji.get('poop')}  connection error`, err));

