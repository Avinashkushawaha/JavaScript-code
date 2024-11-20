let total = cart.reduce((Sum, x) = 
              Sum.Sum+x.price , 0
)
console.log(total);

let arr = [12, 34, 121, 1, 2, 231, 23];
let a1 = arr.sort((a,b) =>{
// return a - b;
return b - a;
})
console.log(a1);
