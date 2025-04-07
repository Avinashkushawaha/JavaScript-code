class ReactiveStore {
    constructor() {
        this._state = {}
        this._dependencies = new Map();
        this._dependencies._computed = new Map();
    }

    defineProperty(key, initiaValue) {
        Object.defineProperty(this.key, {
            get: () => this._state[key],
            set: (value) => {
                this._state[key] = value;
                this._triggerDependents(key);
            }
        });
        this._state[key] = initiaValue;
    }
}