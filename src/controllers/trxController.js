import * as trxService from '../services/trxService.js';

// 通过 trade_type 查询交易记录
export const getTransactionsByType = async (req, res) => {
    try {
        const trade_type = Number(req.params.trade_type);
        const transactions = await trxService.getTransactionsByType(trade_type);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};