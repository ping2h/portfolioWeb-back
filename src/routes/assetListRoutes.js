import express from 'express';
import assetListController from '../controllers/assetListController.js';

const router = express.Router();

/**
 * @swagger
 * /assetLish/getPriceAndCh:
 *   get:
 *     tags:
 *       - AssetList
 *     summary: Get price and change for a specific asset
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset symbol (e.g. BTC, AAPL)
 *     responses:
 *       200:
 *         description: Price and change of the asset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                 change:
 *                   type: number
 */
router.get('/getPriceAndCh', assetListController.getAssetPriceAndCh);
/**
 * @swagger
 * /assetList/getall:
 *   get:
 *     tags:
 *       - AssetList
 *     summary: Get all asset meta information
 *     responses:
 *       200:
 *         description: Array of asset meta info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   symbol:
 *                     type: string
 *                   type:
 *                     type: string
 */
router.get('/getall', assetListController.getAssetList);
/**
 * @swagger
 * /assetList/getIndex:
 *   get:
 *     tags:
 *       - AssetList
 *     summary: Get major index prices and changes
 *     responses:
 *       200:
 *         description: Array of index info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   symbol:
 *                     type: string
 *                   price:
 *                     type: number
 *                   change:
 *                     type: number
 */
router.get('/getIndex', assetListController.getAssetIndex);


export default router;