import * as assetService from '../services/assetService.js';

// 查询最近 months 个月的总资产
export const getMonthlyAssets = async (req, res) => {
    try {
        const months = Number(req.params.months);
        const assets = await assetService.getMonthlyAssets(months-1);
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getLatestAsset = async (req, res) => {
    try {
        const asset = await assetService.getLatestAsset();
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};