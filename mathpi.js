const descripter = Object.getOwnPropertyDescriptor(Math, "PI")

console.log(descripter);
// Math.pi = 5
// console.log(Math.PI);

const chai = {
    name: "ginger chai",
    price: 250,
    isAvailable: true
}

console.log(Object.getOwnPropertyDescriptor(chai, "chai"));

// Object.defineProperty(chai, "name",{
//     writable: false,
//     enumerable: false
// })

// console.log(Object.getOwnPropertyDescriptor(chai, "name"));

for (let [key, value] of chai){
    console.log(`${key}: ${value}`);
}