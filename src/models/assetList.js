let knownAssets = new Map();
let cached = false;

const cacheState = {
    get cached() {
        return cached;
    },
    set cached(val) {
        cached = val;
    }
};

export { cacheState };
export default knownAssets;


