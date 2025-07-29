import assetListService from "../services/assetListService.js";

const getAssetList = async (req, res) => {
    try {
        // dev
        
        const all = await assetListService.getAssetList();
        
        res.status(200).json(all);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getAssetPriceAndCh = async (req, res) => {
    try {
        const { symbol } = req.query;
        const assetData = await assetListService.getAssetPriceAndCh(symbol);
        
        if (!assetData) {
            return res.status(404).json({ error: 'Asset not found' });
        }

        
        res.status(200).json(assetData);
    } catch (error) { 
        res.status(500).send(error.message);
    }
}
export default {
    getAssetList,
    getAssetPriceAndCh,
};
