import connection from '../db/db.js';
import knownAssets from '../models/assetList.js';
// database connection


const token = "d23egtpr01qgiro3c92gd23egtpr01qgiro3c930";
const getAssetList = async () => {
    try {
        const [data] = await connection.query('SELECT * FROM assetList');
        // dev 
        console.log('getAssetList :', data);
        return data;
    } catch (error) {
        throw new Error('Database query failed(getAssetList): ' + error.message);
    }
};

// get price and change of stock by symbol
const getAssetPriceAndCh = async (symbol) => {
    try {

        // auth the symbol
        if (!knownAssets.has(symbol)) {

            const [data] = await connection.query('SELECT * FROM assetList WHERE symbol = ?', [symbol]);
            if (data.length === 0) {
                throw new Error('Asset not found');
            }
            // 2. 将查询结果添加到 knownAssets
            knownAssets.add(data[0]);
        }
        // authed the symbol
        if (symbol == "BTC" || symbol == "ETH") {
            // using bianace api


            //dev
            

            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=BINANCE:${symbol}USDT&token=${token}`);
            // https://finnhub.io/api/v1/quote?symbol=BINANCE:BTCUSDT&token=d23egtpr01qgiro3c92gd23egtpr01qgiro3c930
            console.log('getAssetPriceAndCh :', symbol);
            const data = await res.json();
            return {
                price: data.c,
                change: data.dp
            };
        } else {
            // using finnhub api
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`);
            const data = await res.json();
            return {
                price: data.c,
                change: data.dp
            };
        }
    } catch (error) {
        throw new Error('getAssetPriceAndCh service ' + error.message);
    }
};

export default {
    getAssetList,
    getAssetPriceAndCh

};
