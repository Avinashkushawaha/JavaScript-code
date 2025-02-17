// const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const newNums = myNums.filter( (num) => num > 4)
// console.log(newNums);


// const newNums = myNums.map( (num) => num + 10)
// console.log(newNums);


// const newnums = myNums
//                 .map( (num) => num * 10)
//                 .map( (num) => num + 1)
//                 .filter( (num) => num >= 40)

// console.log(newnums);

const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const myTotal = myNums.reduce(function (acc, currval) {
    console.log(`acc: ${acc} and currval: ${currval}`);
    return acc + currval
}, 0)

console.log(myTotal);







