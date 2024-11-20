function getMin(nums) {
let min = nums.min((min, el) => {
    if (min < el){
        return min;
    } else {
        return el;
    }
});

return min;
}

let nums = [10, 20, 30, 40, 5];

console.log(Min);
