let myName = "Avi"
letmychannel = "chai"

// console.log(myName.trim().length);

let myHeros = ["thor", "spiderman"]

let heroPower = {
    thor: "hammer",
    spiderman: "sling",


    getSpiderPower: function(){
        console.log(`Spidy power is ${this.spiderman}`)
    }
}

Object.prototype.Avi = function(){
    console.log(`Avi is present in all objects`);
}

// heroPower.Avi()
myHeros.Avi()
