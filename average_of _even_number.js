let sum = 0;
let count = 0;


for (let i = 2; i <= 100; i += 2) {
  sum += i;
  count++;
}

let average = sum / count;

console.log("The average of even numbers between 1 and 100 is: " + average);
