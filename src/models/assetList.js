let knownAssets = new Map();
let indexData = new Set();


let cachedAssetList = false;
let cachedIndex = false;

const cacheState = {
    get cachedAssetList() {
        return cachedAssetList;
    },
    set cachedAssetList(val) {
        cachedAssetList = val;
    }
};

const cacheStateIndex = {
    get cachedIndex() {
        return cachedIndex;
    },
    set cachedIndex(val) {
        cachedIndex = val;
    }
};

export { cacheState, cacheStateIndex, indexData };
export default knownAssets;


