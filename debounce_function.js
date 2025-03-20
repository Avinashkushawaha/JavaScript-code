function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };

}

const handleResize = debounce(() => {
    console.log(window.innerWidth);
}, 1000);
window.addEventListener("resize", handleResize);