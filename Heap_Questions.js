class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2  * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length -1;
        while (this.getParentIndex(index) >=0  && this.heap[this.getParentIndex(index)] > this.heap[index]) {
         this.swap(this.getParentIndex(index), index);
         index = this.getParentIndex(index);
        }
    }

    
}
