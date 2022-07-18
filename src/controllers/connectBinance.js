const ccxt = require('ccxt');
require('dotenv').config()

const binance = new ccxt.binance({
    apiKey: process.env.apiKey,
    secret: process.env.secret,
    currency: "usdt"
})

module.exports = binance