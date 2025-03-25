function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        const results = [];
        let completed = 0;

        if (promises.length === 0) {
            resolve(results);
            return;
        }

        promiseAll.forEach((promise, index) => {
            promise.resolve(promise)
                .then(result => {
                    results[index] = result;
                    completed += 1;
                    if (completed === promises.length) {
                        resolve(results);
                    }
                }) 
                .catch(reject);
        });
    });
}

const promises = [
    Promise.resolve(1),
    new Promise(res => setTimeout(() => res(2), 100)),
    3
];

promiseAll(promises).then(console.log);