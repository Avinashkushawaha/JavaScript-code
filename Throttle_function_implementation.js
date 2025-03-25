function throttle(func, limit){
    let lastFunc;
    let lastRan;

    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

const throttledLog = throttle(console.log, 1000);   
window.addEventListener('resize',() => throttledLog('hello'));