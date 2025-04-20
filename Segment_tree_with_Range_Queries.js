class SegmentTree {
    constructor(arr) {
        this.n = arr.length;
        this.size = 1;
        while (this.size < this.n) this.size <<= 1;
        this.tree = new Array(2 * this.size).fill(0);

        for (let i = 0; i < this.n; i++) {
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

    query(left, right) {
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
                right--;
            }
            left >>= 1;
            right >>= 1;
        }
        return res;
            }
        }
      
        const arr = [1, 3, 5, 7, 9, 11];
        const segTree = new SegmentTree(arr);
        console.log(segTree.query(1, 3)); // Output: 15 (3 + 5 + 7)
        segTree.update(1, 10); // Update index 1 to value 10
        console.log(segTree.query(1, 3)); // Output: 22 (10 + 5 + 7)
        console.log(segTree.query(0, 5)); // Output: 42 (1 + 10 + 5 + 7 + 9 + 11)