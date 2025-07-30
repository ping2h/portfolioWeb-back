import express from 'express';
import * as positionController from '../controllers/positionController.js';

const router = express.Router();
/**
 * @swagger
 * /position/all:
 *   get:
 *     tags:
 *       - Position
 *     summary: Get all positions
 *     responses:
 *       200:
 *         description: List of positions
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
 *                   type:
 *                     type: integer
 *                     example: 0
 *                   shares:
 *                     type: number
 *                     example: 100
 *                   current_price:
 *                     type: number
 *                     example: 150.00
 */
router.get('/all', positionController.getAll);
/**
 * @swagger
 * /position/{type}:
 *   get:
 *     tags:
 *       - Position
 *     summary: Get positions by type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: integer
 *         description: Position type (0=Stock, 1=Bond, 2=Crypto)
 *     responses:
 *       200:
 *         description: List of positions by type
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
 *                   type:
 *                     type: integer
 *                     example: 0
 *                   shares:
 *                     type: number
 *                     example: 100
 *                   current_price:
 *                     type: number
 *                     example: 150.00
 */
router.get('/:type', positionController.getPositionByType);
/**
 * @swagger
 * /position/buy/{type}:
 *   put:
 *     tags:
 *       - Position
 *     summary: Buy a position of the specified type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: integer
 *         description: Position type (0=Stock, 1=Bond, 2=Crypto)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: "AAPL"
 *               shares:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Purchase successful
 */
router.put('/buy/:type', positionController.buyPosition);
/**
 * @swagger
 * /position/sell/{type}:
 *   put:
 *     tags:
 *       - Position
 *     summary: Sell a position of the specified type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: integer
 *         description: Position type (0=Stock, 1=Bond, 2=Crypto)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: "AAPL"
 *               shares:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Sell successful
 */
router.put('/sell/:type', positionController.sellPosition);
/**
 * @swagger
 * /position/price/{type}:
 *   put:
 *     tags:
 *       - Position
 *     summary: Update the current price of a position of the specified type
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: integer
 *         description: Position type (0=Stock, 1=Bond, 2=Crypto)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: "AAPL"
 *               current_price:
 *                 type: number
 *                 example: 155.00
 *     responses:
 *       200:
 *         description: Current price updated successfully
 */
router.put('/price/:type', positionController.updatePositionPrice);

export default router;