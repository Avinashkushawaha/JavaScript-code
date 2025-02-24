const radius = [3, 1, 2, 4];

const calculateArea = function (radius)  {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(Math.PI * radius[i] * radius[i]);
    }
    return output;
};   
console.table(calculateArea(radius)); // [28.27, 3.14, 12.57, 50.27]