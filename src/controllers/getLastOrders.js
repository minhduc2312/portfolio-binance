const { STABLE_COIN } = require("../constant");
const binance = require("./connectBinance");
const fetchBalance = require("./fetchBalance");

const getLastOrders = async (_portfolio) => {
    const portfolio = _portfolio || await fetchBalance().then(res=>res.balances);
    const orders = await Promise.all(portfolio.filter(order => !STABLE_COIN.includes(order.symbol)).map(async (order) => {
        const result = await binance.fetchMyTrades(`${order.symbol}BUSD`);
        const lastOrder = result[result.length - 1]
        const { symbol, price, qty } = lastOrder.info
        return {
            symbol,
            info: {
                price: Number(price),
                amount: Number(qty),
                cost: lastOrder.cost
            },
            timestamp: lastOrder.timestamp
        }
    }))
    return orders;
}
module.exports = getLastOrders;