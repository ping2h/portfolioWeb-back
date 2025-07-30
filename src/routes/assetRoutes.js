import express from 'express';
import * as assetController from '../controllers/assetController.js';

const router = express.Router();

/**
 * @swagger
 * /asset/months/{months}:
 *   get:
 *     tags:
 *       - Asset
 *     summary: Query total assets for the most recent number of months
 *     parameters:
 *       - in: path
 *         name: months
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of recent months
 *     responses:
 *       200:
 *         description: List of asset snapshots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   month:
 *                     type: string
 *                     example: "2025-07"
 *                   total_asset:
 *                     type: number
 *                     example: 150000.00
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-30T23:59:00"
 */
router.get('/months/:months', assetController.getMonthlyAssets);
/**
 * @swagger
 * /asset/latest:
 *   get:
 *     tags:
 *       - Asset
 *     summary: Query the latest asset record
 *     responses:
 *       200:
 *         description: Latest asset record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 cash:
 *                   type: number
 *                   example: 50000.00
 *                 stock_value:
 *                   type: number
 *                   example: 80000.00
 *                 bond_value:
 *                   type: number
 *                   example: 20000.00
 *                 crypto_value:
 *                   type: number
 *                   example: 10000.00
 *                 total_asset:
 *                   type: number
 *                   example: 160000.00
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-07-30T23:59:00"
 */
router.get('/latest', assetController.getLatestAsset);

export default router;