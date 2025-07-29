import connection from '../db/db.js';
import knownAssets, { cacheState } from '../models/assetList.js';
// database connection


const token = "d23egtpr01qgiro3c92gd23egtpr01qgiro3c930";
const getAssetList = async () => {
    try {
        if (cacheState.cached) { 

             

            console.log('getAssetList from cache');
            
            const metaArray = Array.from(knownAssets.values()).map(asset => asset.meta);
            // dev
            // console.log('cached data:', metaArray);
            // console.log('cached data:', knownAssets.get("meta"));
            return metaArray
        } else {
            const [data] = await connection.query('SELECT * FROM assetList');
            // dev 
            // console.log('getAssetList :', data);
            console.log('getAssetList from database');
            return data;
        }
        
    } catch (error) {
        throw new Error('Database query failed(getAssetList): ' + error.message);
    }
};

const getAssetListlocal = async () => {
    try {
        const [data] = await connection.query('SELECT * FROM assetList');
        // dev 
        // console.log('getAssetList :', data);
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

const cacheAssetList = async () => {
    try {
        let assetList = await getAssetListlocal();
        
        assetList.forEach(asset => {
            knownAssets.set(asset.symbol, {
                price: 0,
                change: 0,
                meta: {
                    "id": asset.id,
                    "name": asset.name,
                    "symbol": asset.symbol,
                    "type": asset.type,
                }
            });
        });

        
        cacheState.cached = true;
        // dev
        console.log('Asset list cached successfully');
    } catch (error) {
        console.error('Error caching asset list:', error.message);
    }
};

export default {
    getAssetList,
    getAssetPriceAndCh,
    cacheAssetList,

};
