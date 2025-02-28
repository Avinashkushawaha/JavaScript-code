// const p = new promise((resolve, reject) => {
//     resolve("Promise Resolved Value");
// })
// async function getData() {
//     return "hello world"
// }

// const dataPromise = getData();
// dataPromise.then((res) => console.log(res))


const p = new Promise((resolve, reject) => {
    resolve("Promise Resolved Value !!");
});

async function handlePromise(){
    const val = await p;
    console.log(val);
}

handlePromise();