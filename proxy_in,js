const person = {
    name: 'John',
    age: 30

};

const handler = {
    get: function(target, prop) {
    if (prop in target) {
        return target[prop];
    } else {
        return `Property ${prop} not found`;
    }
}
};

const proxy = new Proxy(person, handler);
console.log(proxy.name);
console.log(proxy.age);
console.log(proxy.address); // Property address not found
