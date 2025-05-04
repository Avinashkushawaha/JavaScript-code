class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.lenght - 1];
    }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.peek());
console.log(stack.pop());