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
        let pos = this.size + index;
        this.tree[pos] = value;
        pos >>= 1;

        while (pos >= 1) {
            this.tree[pos] = this.tree[2 * pos] + this.tree[2 * pos + 1];
            pos >>= 1;
        }
    }

    queryRange(left, right) {
        let res = 0;
        left += this.size;
        right += this.size;

        while (left <= right) {
            if (left % 2 === 1) {
                res += this.tree[left];
                left++;
            }
            if (right % 2 === 0) {
                res += this.tree[right];
                left--;
            }
            left >>= 1;
            right >>= 1;
        }

        return res;
    }
}