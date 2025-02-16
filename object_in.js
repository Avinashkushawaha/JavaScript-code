// object literals

// const user = {
//   name: "John",
//   age: 20,
//   email: "john@gmail.com",
// };

// console.log(user.name);
// console.log(user["email"]);
// console.log(user["age"]);

// single ton

const tinderUser = new Object();

tinderUser.id = "123abc";
tinderUser.name = "Sam";
tinderUser.isLoggedIn = false;

console.log(tinderUser);
