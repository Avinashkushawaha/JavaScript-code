class ReactiveStore {
    constructor(data) {
        this.data = data 
        this.subscribers = new set();
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


    }
