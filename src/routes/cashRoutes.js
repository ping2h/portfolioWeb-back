import express from 'express';
import * as cashController from '../controllers/cashController.js';

const router = express.Router();

/**
 * @swagger
 * /cash/income/{months}:
 *   get:
 *     tags:
 *       - Cash
 *     summary: Get cash inflow for the last n months
 *     parameters:
 *       - in: path
 *         name: months
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of recent months
 *     responses:
 *       200:
 *         description: List of income data
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
 *                   income:
 *                     type: number
 *                     example: 10000.00
 */
router.get('/income/:months', cashController.getIncomeByRecentMonths);
/**
 * @swagger
 * /cash/outcome/{months}:
 *   get:
 *     tags:
 *       - Cash
 *     summary: Get cash outflow for the last n months
 *     parameters:
 *       - in: path
 *         name: months
 *         required: true
 *         schema:
 *           type: integer
 *         description: Number of recent months
 *     responses:
 *       200:
 *         description: List of outcome data
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
 *                   outcome:
 *                     type: number
 *                     example: 5000.00
 */
router.get('/outcome/:months', cashController.getOutcomeByRecentMonths);
/**
 * @swagger
 * /cash/deposit/{amount}:
 *   put:
 *     tags:
 *       - Cash
 *     summary: Deposit cash
 *     parameters:
 *       - in: path
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *         description: Amount to deposit
 *     responses:
 *       200:
 *         description: Deposit successful
 */
router.put('/deposit/:amount', cashController.depositCash);
/**
 * @swagger
 * /cash/withdraw/{amount}:
 *   put:
 *     tags:
 *       - Cash
 *     summary: Withdraw cash
 *     parameters:
 *       - in: path
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *         description: Amount to withdraw
 *     responses:
 *       200:
 *         description: Withdraw successful
 */
router.put('/withdraw/:amount', cashController.withdrawCash);

export default router;