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

async function Avi() {
    return 5
}

Avi().then((x) => {
    alert(x)
})


