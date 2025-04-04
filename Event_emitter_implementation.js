class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (!this.events[events]) return this;
        this.events[event] = this.events[event].filter
        (1 = 1 !== listener)
        return this;
    }

    emit(event, ...args) {
        if (!this.events[event]) return this;
        this.events[event].forEach(listener => listener(...args));
        return this;

    }
}

const emitter = new EventEmitter();
const listener = data => console.log('Event received:', data);

emitter.on('event1', listener);
emitter.emit('test','Hello World');

emitter.off('test', listener);
emitter.emit('test', 'Hello again');