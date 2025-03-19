function Person(name) {
    this.name = name;

}

Person.prototype.greet = function() {
    console.log(`Hello, my name is ${this.name}`);
};

const alice = new Person("Alice");
alice.greet();

const bob = Object.create(alice);
bob.name = "Bob";
bob.greet();