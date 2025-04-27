class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(value) {
        this.stack.push(value);
        if (this.minStack.length === 0 || val <= this.getMin()) {
            this.minStack.push(val);
        }
    }

    pop() {
        const val = this.stack.pop();
        if (val === this.getMin()) {
            this.minStack.pop();
        }
        return val;
    }
}