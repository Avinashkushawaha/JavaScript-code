// for (let index = 0; index < 10; index++) {
//     const element = index;
//     console.log(element);
// }




// for (let i = 0; i <= 10; i++) {
//     // console.log(`Outer loop ${i}`);
//     for (let j = 0; j <= 10; j++) {
//         // console.log(`Inner loop ${j}`);
//         console.log(i + " * " + j + " = " + i * j);
//     }
// }



for (let index = 1; index <= 10; index++) {
  if (index == 5){
      console.log(`detected 5`)
    continue;
}
console.log(`value of i is ${index}`);

}