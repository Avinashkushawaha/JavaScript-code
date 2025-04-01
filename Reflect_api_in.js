const obj = { name: "Alice"};

console.log(Reflect.has(obj, "name"));
console.log(Reflect.get(obj, "name"));

Reflect.set(obj, "name", "bob");
console.log(obj.name);