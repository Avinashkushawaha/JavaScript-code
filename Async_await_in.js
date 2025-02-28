// const p = new promise((resolve, reject) => {
//     resolve("Promise Resolved Value");
// })
// async function getData() {
//     return "hello world"
// }

// const dataPromise = getData();
// dataPromise.then((res) => console.log(res))


// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//      resolve("Promise Resolved Value !!");
//     }, 1000)
// });

// // await can only be used inside an asyn function
// async function handlePromise(){
//     const val = await p;
//     console.log(val);
// }

// handlePromise();


const p2 = new Promise((resolve, reject) =>{
    setTimeout(() =>{
        resolve("promise Resolved Value!!");
    }, 1000);
});

async function handlePromise(){
    console.log("Hello world!!");

    const val = await p1;
    console.log("Hello javaScript");
    console.log(val);

    const val2 = await p2;
    console.log("Namaste javaScript2");
    console.log(val2)
}
handlePromise();