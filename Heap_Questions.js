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
   extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifDown();
    return min;
   }

   heapifDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.heap.length) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        if (this.getRightChildIndex(index) < this.heap.length &&
     this.heap[this.getLeftChildIndex(index)] < this.heap[smallerChildIndex]) {
        smallerChildIndex = this.getRightChildIndex(index);
     }

     if (this.heap[index] < this.heap[smallerChildIndex]) {
        break;
     } else {
        this.swap(index, smallerChildIndex);
     }
     index = smallerChildIndex;
     }
    }
   }


