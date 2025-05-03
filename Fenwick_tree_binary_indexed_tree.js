class FenwickTree {
    constructor(size) {
        this.size = size;
        this.tree = new Array(size + 1).fill(0);
    }

    update(index, delta) {
        index++;
        while (index <= this.size) {
            this.tree[index] += delta;
            index += index & -index;
        }
    }

    
}