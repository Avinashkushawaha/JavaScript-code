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

    computed(key, fn, deps) {
        this._computed.set(key, fn);
        this._dependencies.set(key, deps);

        Object.defineProperty(this, key, {
            get: () => {
                const shouldRecompute = deps.some(dep =>
                    this._state[`${key}_lastDeps`]?.[dep] !== this._state[dep]
                );

                if (shouldRecompute || !(`${key}_value` in this._state)) {
                    this._state[`${key}_value`] = fn.call(this);
                    this._state[`${key}_lastDeps`] = deps.reduce((acc, dep) => {
                        acc[dep] = this._state[dep];
                        return acc;
                    }, {});

                }

                return this._state[`${key}_value`];
            }
        })
    }
    _triggerDependents(changeKey) {
        for (const [computedKey, deps] of this._dependencies) {
            if (deps.includes(changeKey)) {
                delete this._state[`${computedKey}_value`];
            }
        }
    }
}

const store = new ReactiveStore();
store.defineProperty('price', 10);
store.defineProperty('quantity', 2);
store.computed('total', () => store.price * store.quantity, ['price', 'quantity']);

console.log(store.total);
store.price = 15;
console.log(store.total);
