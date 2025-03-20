function greet() {
    console.log(this.name);
}

const obj = { name: "Alice" };
greet.call(obj); 
greet.apply(obj);

const bound = greet.bind(obj);
boundGreet();