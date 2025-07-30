import * as cashService from '../services/cashService.js';

export const getIncomeByRecentMonths = async (req, res) => {
    try {
        const months = Number(req.params.months) || 1;
        const result = await cashService.getCashIncomeByRecentMonths(months);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getOutcomeByRecentMonths = async (req, res) => {
    try {
        const months = Number(req.params.months) || 1;
        const result = await cashService.getCashOutcomeByRecentMonths(months);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 存钱
export const depositCash = async (req, res) => {
    try {
        const amount = Number(req.params.amount);
        const result = await cashService.depositCash(amount);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 取钱
export const withdrawCash = async (req, res) => {
    try {
        const amount = Number(req.params.amount);
        const result = await cashService.withdrawCash(amount);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};