class Observable {
    constructor() {
        this.subscribers = [];
    }

    subscrib(fn) {
        this.subscribers.push(fn);
        return () => {
            this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn);
        };
    }
   
    next(value) {
        this.subscribers.forEach(fn => fn(value));
    }
}

const observable = new Observable();
const unsubscribe = observable.subscrib(value => console.log(value));
observable.next('Hello');
unsubscribe();
observable.next('World');