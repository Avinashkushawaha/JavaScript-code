class DisjointSet {
    constructor(size) {
        this.parent = new Array(size);
        this.rank = new Array(size);
        for (let i = 0; i < size; i++) {
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    } 

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const xRoot = this.find(x);
        const yRoot = this.find(y);

        if (this.rank[xRoot] < this.rank[yRoot]) {
            this.parent[xRoot] = yRoot;
        }
        else if (this.rank[xRoot] > this.rank[yRoot]) {
            this.parent[yRoot] = xRoot;
        } else {
            this.parent[yRoot] = xRoot;
            this.rank[xRoot]++;
        }
    }

    isConnected(x, y) {
        return this.find(x) === this.find(y);
    }

}

const ds = new DisjointSet(10);
ds.union(0, 2);
ds.union(4, 2);
ds.union(3, 1);

console.log(ds.isConnected(0, 4));
console.log(ds.isConnected(1, 0));
ds.union(1, 0);
console.log(ds.isConnected(1, 0))
