let myName = "Avi"
letmychannel = "chai"

// console.log(myName.trim().length);

let myHeros = ["thor", "spiderman"]

let heroPower = {
    thor: "hammer",
    spiderman: "sling",


    getSpiderPower: function(){
        // console.log(`Spidy power is ${this.spiderman}`)
    }
}

Object.prototype.Avi = function(){
    // console.log(`Avi is present in all objects`);
}

// heroPower.Avi()
myHeros.Avi()



const User = {
    name: "chai",
    email: "chai@google.com"
}

const Teacher = {
    makeVideo: true
}

const TeachingSupport = {
    isAvailable: false
}

const TASupport = {
    makeAssignment: 'js Assignment',
    fullTime: true,
    __proto__: TeachingSupport
}

Teacher.__prot__ = User

// modern syntax
Object.setPrototypeOf(TeachingSupport, Teacher)

let anotherUsername = "ChaiAurCode"

String.prototype.trueLength = function(){
    console.log(`${this}`);
    console.log(`${this.name}`);
    console.log(`True length is${this.trim().length}`);
}

anotherUsername.trueLength()
"Avi".trueLength()
"iceTea".trueLength()