let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Value 1")
    }, 1000)
})

async function Avi() {
    return 5
}

Avi().then((x) => {
    alert(x)
})


