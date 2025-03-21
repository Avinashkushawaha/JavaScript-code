const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const add5 = (x) => x + 5;
const multiply = (x) => x * 2;

const transform = compose(multiplyBy2, add5);
console.log(transform(10)); // 25