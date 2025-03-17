function outerFunction() {
    let outerVar = " I am outside!";
    return function innerFunction() {
        return outerVar;
    };
}

const closure = outerFunction();
console.log(closure());