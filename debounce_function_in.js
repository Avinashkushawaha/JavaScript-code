function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() =>func.apply(this, args), delay);
    };
}

const debouncedFunction = debounce(() => console.log("Executed"), 500);
window.addEventListener("resize", debouncedFunction);