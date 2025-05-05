class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }
}

const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
console.log(queue.dequeue());