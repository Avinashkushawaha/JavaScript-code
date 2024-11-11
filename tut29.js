let promise1 = Promise.resolve(10);
let promise2 = promise1.then(result => result * 2);
let promise3 = promise2.then(result => result + 5);

promise3.then(result => console.log(result));  // Outputs: 25
