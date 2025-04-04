class Lazy {
    constructor(computeFn) {
        this.computeFn = computeFn;
        this.computed = false;
        this.value = undefined;
    }

    get() {
        if (!this.computed) {
            this.value = this.computeFn();
            this.computed = true;
        }
        return this.value;
    }
}

const lazyValue = new Lazy(() => {
    console.log('Computing expensive value...');
    return 42;
});

console.log('Before get');
console.log(lazyValue.get());
console.log(lazyValue.get());
