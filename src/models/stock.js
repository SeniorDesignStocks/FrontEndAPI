const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const stockSchema = mongoose.Schema({
  symbol: { type: String, unique: true, required: true },
  curValues: {
    value: Number,
    average: Number,
  },
  plotData: Array,
});

module.exports = mongoose.module('Stock', stockSchema);
