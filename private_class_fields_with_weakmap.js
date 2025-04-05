const privateData = new WeakMap();

class Person{
    constructior(name, age){
        privateData.set(this, {name, age});
    }

    getName(){
        return privateData.get(this).name;
    }
    getAge(){
        return privateData.get(this).age;
    }
}

const person = new Person('John', 30);
console.log(person.getName()); // John
console.log(person.name()); // 30
