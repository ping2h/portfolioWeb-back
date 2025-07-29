import positionService from '../services/positionService.js';

export const getAll = async (req, res) => {
    try {
        const all = await positionService.getAll();
        res.status(200).json(all);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getPositionByType = async (req, res) => {
    try {
        if (req.params.type == 0) {
            const stock = await positionService.getStock();
            res.status(200).json(stock);
        } else if (req.params.type == 1) {
            const bond = await positionService.getBond();
            res.status(200).json(bond);
        } else if (req.params.type == 2) {
            const crypto = await positionService.getCrypto();
            res.status(200).json(crypto);
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 购买某个position
export const buyPosition = async (req, res) => {
    try {
        const type = Number(req.params.type);
        const { symbol, shares } = req.body;
        const result = await positionService.buyPosition(type, symbol, shares);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 出售某个position
export const sellPosition = async (req, res) => {
    try {
        const type = Number(req.params.type);
        const { symbol, shares } = req.body;
        const result = await positionService.sellPosition(type, symbol, shares);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 修改某个资产的价格
export const updatePositionPrice = async (req, res) => {
    try {
        const type = Number(req.params.type);
        const { symbol, current_price } = req.body;
        const result = await positionService.updatePositionPrice(type, symbol, current_price);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
