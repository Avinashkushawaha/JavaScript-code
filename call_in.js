function SetUsername(username){
    // complex db calls
    this.username = username
}

function createUser(username, email, password){
    SetUsername(username)

    this.email = email
    this.password = password
}

const chai = new createUser("chai", "chai@gnnjg.com", "123")
console.log(chai);