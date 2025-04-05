function trampoline(fn) {
  return function(...args) {
    let result = fn(...args);
    while (typeof result === 'function') {
      result = result();
    }
    return result();
  
  return result;
};
}

const factorial = trampoline(function fact(n, acc = 1) {
     return n <= 1 ? acc : () => f(n - 1, n * acc);
})

console.log(factorial(100000))