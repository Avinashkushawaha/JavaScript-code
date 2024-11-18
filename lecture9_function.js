function add(a, b) {
    return a+b;
}
function mul(c, d) {
    return c*d;
}
function operation(funName,x,y) {
    return funName(x,y)
}

let total = operation(add, 10,20);
console.log(total);