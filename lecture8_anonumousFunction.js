// anonymous function
// function(){
//     for (let i = 0; i < 50; i++) {
//         if(i % 2 != 0){
//             console.log("The Odd is :"+i)
//         }
//     }
// }

// function with Expression


// let oddNum = function(){
//     for (let i = 0; i < 50; i++ ){
//         if(i % 2 != 0){
//             console.log("The Odd is:"+i);
//         }
//     }
// }

// oddNum()
// console.log(typeof oddNum);



// Immedeatly Invoked Function Expression

(function (a,b){
    for (let i = 0; i < 50; i++) {
        if(i % 2 == 0){
            console.log("The Odd  number is :"+i);
        }
        console.log(a + b);
    }
})(10, 20)

