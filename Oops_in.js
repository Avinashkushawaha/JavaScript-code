// const user = {
//     username: "hitesh",
//     loginCount: 8,
//     signedIn: true,

//     getUserDetails: function(){
//        console.log(" Got user details from database")
//        console.log(`Username: ${this.username}`);
//     }
// }

// console.log(user.username);
// console.log(user.getUserDetails());

function User(username, loginCount, isLoggedIn){
    this.username = username;
    this.loginCount = loginCount;
    this.isloggedIn = isLoggedIn

    return this
}

const userOne = User("Avi", 12, true)
const userTwo = User("ChaiaurCode", 11, false)
console.log(userOne);