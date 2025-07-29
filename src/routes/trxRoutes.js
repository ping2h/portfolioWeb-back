import express from 'express';
import * as trxController from '../controllers/trxController.js';

const router = express.Router();

// 通过 trade_type 查询交易记录
// GET /trx/:trade_type
router.get('/:trade_type', trxController.getTransactionsByType);

export default router;