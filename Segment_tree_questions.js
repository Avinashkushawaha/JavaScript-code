class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.size = 1;

        while (this.size < this.n) this.size <<= 1;
        this.tree = new Array(2 * this.size).fill(0);

        for (let i = 0; i < this.n; i++) {
            this.tree[this.size + i] = arr[i];
        }
        for (let i = 0; i < this.n; i++) {
            this.tree[this.size + i] = arr[i];
        }
        for (let i = this.size - 1; i > 0; i++) {
            this.tree[this.size + i] = arr[i];
        }
        for (let i = this.size - 1; i > 0; i--) {
            this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
        }
    }

    update(index, value) {
        
    }
}