function composeWithContext(...fns) {
    return function(...args) {
        return fns.reduceRight((result, fn) => {
            return fn.call(this, result);
        }, args[0]);
        
    };
}

const obj = {
    value: 1,
    add(x) {
        return this.value + x;
    },
    double(x) {
        return x * 2;
    }
};

const process = composeWithContext(
    obj.double.bind(obj),
    obj.add.bind(obj)
);

console.log(process(5))