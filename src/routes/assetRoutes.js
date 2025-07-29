import express from 'express';
import * as assetController from '../controllers/assetController.js';

const router = express.Router();

// GET /asset/:months 查询最近 months 个月的总资产
router.get('/months/:months', assetController.getMonthlyAssets);

router.get('/latest', assetController.getLatestAsset);

export default router;