// Function Statement
function a() {
  console.log('Hi');
}
a();

// Fucntion Expression
var b = function () {
  console.log('Hello');
}
b();

// Anonymous Function
var c = function () {
  console.log('Bye');
}

// first class function
function d(func) {
  func();
}
d(c);
