import cron from 'node-cron';
import axios from 'axios';
import db from '../db/db.js';

const API_KEY = 'ZIYM9NZQ7EA3UBI0';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchPrice = async (symbol, type) => {
  try {
    if (type === 2) {
      const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${API_KEY}`;
      const { data } = await axios.get(url);
      const priceStr = data?.['Realtime Currency Exchange Rate']?.['5. Exchange Rate'];
      return priceStr ? parseFloat(priceStr) : null;
    } else {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
      const { data } = await axios.get(url);
      const priceStr = data?.['Global Quote']?.['05. price'];
      return priceStr ? parseFloat(priceStr) : null;
    }
  } catch (err) {
    console.error(`❌ 获取 ${symbol} 价格失败：${err.message}`);
    return null;
  }
};

const updatePrices = async () => {
  console.log('[任务开始] 正在更新 4 条资产的价格...');

  try {
    // 每次只更新 4 条，避免触发速率限制
    const [positions] = await db.query(`
      SELECT id, symbol, type 
      FROM position 
      ORDER BY updated_at ASC 
      LIMIT 4
    `);

    for (const { id, symbol, type } of positions) {
      const price = await fetchPrice(symbol, type);
      if (price) {
        await db.query(`UPDATE position SET current_price = ?, updated_at = NOW() WHERE id = ?`, [price, id]);
        console.log(`✅ ${symbol} 价格更新为 ${price}`);
      } else {
        console.warn(`⚠️ ${symbol} 获取价格失败`);
      }
      await sleep(15000); // 每个请求之间间隔 15 秒
    }

    console.log('[任务完成] ✅ 本轮价格更新完毕');
  } catch (err) {
    console.error('❌ updatePrices 出错：', err.message);
  }
};

// 每小时的 0,20,40 分触发一次
cron.schedule('0,20,40 * * * *', updatePrices);