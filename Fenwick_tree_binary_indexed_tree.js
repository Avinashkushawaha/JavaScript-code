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
   
    query(index) {
        index++;
        let sum = 0;
        while (index > 0) {
            sum += this.tree[index];
            index -= index & -index;
        }
        return sum;
    }

    rangeQuery(left, right) {
        return this.query(right) - this.query(left - 1);
    }

}