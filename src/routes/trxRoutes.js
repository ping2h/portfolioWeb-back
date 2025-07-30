import express from 'express';
import * as trxController from '../controllers/trxController.js';

const router = express.Router();

/**
 * @swagger
 * /trx/{trade_type}:
 *   get:
 *     tags:
 *       - Transaction
 *     summary: Query transaction records by trade_type
 *     parameters:
 *       - in: path
 *         name: trade_type
 *         required: true
 *         schema:
 *           type: integer
 *         description: Trade type (0=Buy, 1=Sell)
 *     responses:
 *       200:
 *         description: List of transaction records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   symbol:
 *                     type: string
 *                     example: "AAPL"
 *                   trade_type:
 *                     type: integer
 *                     example: 0
 *                   quantity:
 *                     type: number
 *                     example: 10
 *                   price:
 *                     type: number
 *                     example: 150.00
 *                   market_value:
 *                     type: number
 *                     example: 1500.00
 *                   status:
 *                     type: integer
 *                     example: 0
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-07-30T12:00:00"
 */
router.get('/:trade_type', trxController.getTransactionsByType);

export default router;