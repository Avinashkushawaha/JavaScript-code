const arr = [1, 2, 3, 4, 5]

for (const num of arr) {
    // console.log(num);
}

const greetings = "Hello World"

for (const greet of greetings) {
    // console.log(`Each character is ${greet}`);
}

// maps

const map = new Map()
map.set('IN', "India")
map.set('USA', "United States of America")
map.set('FR', "France")


for (const [key, value] of map) {
    // console.log(key, ':-', value);
}

// const myObject = {
//     game1: 'NFS',
//     game2: 'Spiderman'
// }

// for (const [key, value] of myObject) {
    // console.log(key, ':-', value);




const myObject = {
    js: 'javascript',
    cpp: 'C++',
    rb: "ruby",
    swift: "swift by apple"
}
for (const key in myObject) {
    // console.log(`${key} shortcut is for ${myObject[key]}`);
}   


const programming = ["js", "rb", "py", "java", "cpp"]

programming.forEach(function (item) {
    console.log(item);
})




