const obj1 = Object.freeze({ name: "Alice", age: 25});
obj1.name = "Bob";
console.log(obj1);

const obj2 = Object.seal({ name: "Alice", age: 25});
obj2.name = "Bob";
console.log(obj2);

delete obj2.age;
console.log(obj2);