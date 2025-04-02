class ReactiveStore {
    constructor(data) {
        this.data = data;
        this.subscribers = new Set();
    }
    
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    update(path, value) {
        const keys = path.split('.');
        let current = this.data;

        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        this.notify(path, value);
    }

    notify(path, value) {
        for (const subscriber of this.subscribers) {
            subscriber(path, value);
        }
    }
}

const store = new ReactiveStore ({
    user :{
        name: 'Alice',
        preferences: {
            theme: 'dark'
        }
    }
});

const unsubscribe = store.subscribe((path, value) => {
    console.log(`Changed ${path} to ${value}`);
});

store.update('user,name', 'Bob');
store.update('user.preference.theme', 'light');