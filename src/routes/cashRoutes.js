import express from 'express';
import * as cashController from '../controllers/cashController.js';

const router = express.Router();

// GET /cash/income/:months 获取最近n个月现金流收入
router.get('/income/:months', cashController.getIncomeByRecentMonths);
router.get('/outcome/:months', cashController.getOutcomeByRecentMonths);

export default router;