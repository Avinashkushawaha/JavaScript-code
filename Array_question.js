class CircularBuffer {
    constructor(capacity) {
        this.buffer = new Array(capacity);
        this.capacity = capacity;
        this.head = 0;
        this.tail = 0;
        this.size = 0;
    }

    enqueue(item) {
        if (this.isFull()) {
            this.head = (this.head + 1) % this.capacity;
            this.size--;
        }
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;
        this.size++;
    }
     isFull() {
        return this.size === this.capacity;
     }
    isEmpty() {
        return this.size === 0;
    }
}