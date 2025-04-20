class BloomFilter {
    constructor(size = 1000, hashFunctions = 3) {
        this.size = size;
        this.storage = new Array(size).fill(false);
        this.hashFunctions = this._createHashFunctions(hashFunctions);
    }

    _createHashFunctions(count) {
        const seeds = [];
        for (let i = 0; i < count; i++) {
            seeds.push(Math.floor(Math.random() * 1000)); 
        }
        return seeds.map(seed => {
            return (str) => {
                let hash = seed;
                for (let i = 0; i < str.length; i++) {
                    hash = (hash * 31 + str.charCodeAt(i)) % this.size;
                }
                return hash;
            };
        });
    }

    add(item) {
        for (const hashFunction of this.hashFunctions) {
            const index = hashFunction(item);
            this.storage[index] = true;
        }
    }
    
}