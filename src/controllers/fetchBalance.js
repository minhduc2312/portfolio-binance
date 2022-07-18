const { STABLE_COIN } = require("../constant");
const binance = require("./connectBinance");

const fetchBalance = async () => {
    const balance = await binance.fetchBalance().then(res => res.info.balances);
    const newBalance = balance.filter(item => item.free > 0)

    const convertToBUSD = await Promise.all(newBalance.map(async (item) => {
        if (!STABLE_COIN.includes(item.asset)) {
            const price = await binance.fetchOHLCV(`${item.asset}BUSD`, '1m', Date.now() / 1000 * 1000 - 80000);
            return {
                symbol: item.asset,
                amount: Number(item.free),
                price: item.free * price[0][4]
            }
        }
        return {
            symbol: item.asset,
            amount: Number(item.free),
            price: Number(item.free),
        }
    }));

    const total = convertToBUSD.reduce((total, curr) => {
        return total + Number(curr.price);
    }, 0)

    return {
        balances: [...convertToBUSD],
        total,
    }
}

module.exports = fetchBalance 