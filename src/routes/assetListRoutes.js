import express from 'express';
import assetListController from '../controllers/assetListController.js';

const router = express.Router();


router.get('/getPriceAndCh', assetListController.getAssetPriceAndCh);
router.get('/getall', assetListController.getAssetList);
router.get('/getIndex', assetListController.getAssetIndex);


export default router;