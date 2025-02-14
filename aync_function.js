let delhiWeather = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Delhi is hot")
    }, 1000)
})

let mumbaiWeather = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Mumbai is hot")
    }, 2000)
})


let delhi = await delhiWeather
let mumbai = await mumbaiWeather

console.log(delhi, mumbai)

