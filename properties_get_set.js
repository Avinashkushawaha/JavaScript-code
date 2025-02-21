function User(email, password){
    this._email = email;
    this._password = password

    Object.defineProperty(this, 'emial', {
        get: function(){},
        set: function(value){
            this.email = value
        }
    })

}

const chai = new User("chai@chai.com", "chai")

console.log(chai.email);