class Dep {
    constructor() {
        this.subscribers = new Set();
    }

    depend() {
        if (activeEffect) {
            this.subscribers.add(activeEffect);
        }
    }

    notify() {
        this.subscribers.forEach(effect => effect());
    }
}

let activeEffect = null;

function watchEffect(effect) {
    activeEffect = effect;
    effect();
    activeEffect = null;
}

function reactive(obj) {
    const deps = new Dep();

    return new Proxy(obj, {
        get(target, key) {
            let dep = deps.get(key);
            if (!dep) {
                dep = new Dep();
                deps.set(key, dep);
            }
            dep.depend();
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            const result = Reflect.set(target, key, value);
            const dep = deps.get(key);
            if (dep) dep.notify();
            return result;
        }
    });
}
     