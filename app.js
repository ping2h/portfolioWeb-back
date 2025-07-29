
import express from 'express';



import positionRoutes from './src/routes/positionRoutes.js';
import assetListRoutes from './src/routes/assetListRoutes.js';
import caashRoute from './src/routes/cashRoutes.js';
import assetRoutes from './src/routes/assetRoutes.js';
import trxRoutes from './src/routes/trxRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

import assetListService from './src/services/assetListService.js';


import './src/schedule/assetUpdate.js';
import './src/schedule/positionPriceUpdate.js';


const app = express();
const PORT = 3000;

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(path.join(__filename));

__dirname = __dirname.replace('portfolioWeb-back', 'portfolioWeb-front');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  console.log('Request received for root path');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


console.log(__dirname);
app.get('/trade', (req, res) => {
  console.log('Request received for root path');
  res.sendFile(path.join(__dirname, 'public', 'trade.html'));
});



/*
app.get('/position', (req, res) => {
  console.log('Request received for root path');
  res.sendFile(path.join(__dirname, 'public', 'positions.html'));
});
*/

app.get('/dashboard', (req, res) => {
  console.log('Request received for root path');
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});



app.use('/position', positionRoutes);
app.use('/assetList', assetListRoutes);
app.use('/asset', assetRoutes);
app.use('/trx', trxRoutes);




// test api connection  /////
/////

// const url = 'https://finnhub.io/api/v1/quote?symbol=BINANCE:BTCUSDT&token=d23egtpr01qgiro3c92gd23egtpr01qgiro3c930';

// const fetchData = async () => {
//   try {
//     const res = await fetch(url);
//     const text = await res.text(); // 百度返回的是 HTML 页面
//     console.log('成功获取内容：');
//     console.log(text.slice(0, 500)); // 只打印前500个字符
//   } catch (error) {
//     console.error('请求失败:', error.message);
//   }
// };

// fetchData();

// cache assetList before starting server
assetListService.cacheAssetList();


app.use('/cash',caashRoute);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

