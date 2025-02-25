// const arr = [5, 1, 3, 2, 6];


// const output = arr.map(function (element) {
//     return element * 2;
// });
// console.log(output);

// filter odd value

// function isOdd(x) {
//     return x % 2;
// }

// const output = arr.filter(isOdd);
// console.log(output);

// function findSum(arr) {_
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         sum += arr[i];
//     }
//     return sum;

// }
// console.log(findSum(arr));
// const outout = arr.reduce(function (acc, curr) {
//     return acc + curr;
// });


const user =[
{firstname: "harshit", lastname: "singh", age: 24},
{firstname: "Avi", lastname: "maurya", age: 45},
{firstname: "deep", lastname: "yug", age: 50},
{firstname: "prem", lastname: "asthana", age: 24},
];

const output = user.reduce(function (acc, curr) {
    if (acc[curr.age]) {
        acc[curr.age] = ++acc[curr.age];
    } else {
        acc[curr.age] = 1;
    }
    return acc;
}, {});
console.log(output);