class HashTable {
    constructor(size = 10) {
        this.size = size;
        this.table = new Array(size).fill().map(() => []);

    }

    _hash(key) {
        let hash = 0;
        for (const char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.size;
    }

    set (key, value) {
        const index = this._hash(key);
        this.table[index].push({ key, value });
    }

    get(key) {
        const index = this._hash(key);
        return this.table[index].find((item) => item.key === key)?.value;
    }
}

const ht = new HashTable();
ht.set("name", "Alice");
console.log(ht.get("name"));