// create an array of numbers and take input from the user to add numbers to this array
// let arr = [1, 2, 3, 4, 5]
// let a = prompt("Enter a number")
// a = Number.parseInt(a)
// arr.push(a)
// console.log(arr)


// keep adding numbers to the array in 1 until 0 is added to the array
// let arr = [1, 2, 3, 4, 5]
// let a;
// do {
//     let a = prompt("Enter a number")
//     a = Number.parseInt(a)
//     arr.push(a)
// } while (a != 0);
// console.log(arr)


// filter for numbers divisible by 10 from a given array
// let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// let a = arr2.filter((value) => {
//     return value % 10 == 0
// })
// console.log(a)


// create an array of square of a given numbers
// let arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// let a = arr3.map((value) => {
//     return value * value
// })
// console.log(a)


// use reduce to calculate the factorial of a given number from an array of first n natural numbers
let arr4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let a = arr4.reduce((value1, value2) => {
    return value1 * value2
})
console.log(a)


