import express from 'express';



import positionRoutes from './src/routes/positionRoutes.js';
import assetListRoutes from './src/routes/assetListRoutes.js';
import caashRoute from './src/routes/cashRoutes.js';
import assetRoutes from './src/routes/assetRoutes.js';
import trxRoutes from './src/routes/trxRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

import assetListService from './src/services/assetListService.js';


import './src/schedule/assetUpdate.js';
import './src/schedule/positionPriceUpdate.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './swagger.js';

// login services
import session from 'express-session';
import cookieParser from 'cookie-parser';
import isAuthenticated from './src/middlewares/authMiddleware.js';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',   // 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // 
}));

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(path.join(__filename));

__dirname = __dirname.replace('portfolioWeb-back', 'portfolioWeb-front');




app.get('/', isAuthenticated, (req, res) => {

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


console.log(__dirname);
app.get('/trade', isAuthenticated, (req, res) => {
  console.log('Request received for root path');
  res.sendFile(path.join(__dirname, 'public', 'trade.html'));
});



/*
app.get('/position', (req, res) => {
  console.log('Request received for root path');
  res.sendFile(path.join(__dirname, 'public', 'positions.html'));
});
*/




app.use('/position', isAuthenticated,  positionRoutes);
app.use('/assetList', isAuthenticated, assetListRoutes);
app.use('/asset', isAuthenticated, assetRoutes);
app.use('/trx', isAuthenticated,  trxRoutes);
app.use('/user', userRoutes);



// Serve static files from the 'public' directory

app.use(express.static(path.join(__dirname, 'public')));



// cache assetList before starting server
assetListService.cacheAssetList();
// cache asset index before starting server
assetListService.cacheIndex();

app.use('/cash',caashRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

