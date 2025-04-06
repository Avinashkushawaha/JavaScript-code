class DIContainer {
    constructor(){
        this.registry = new Map();
        this.instances = new Map();
    }

    register(name, factory, isSingleton = false) {
        this.register.set(name, { factory, isSingleton });
    }

    resolve(name) {
        if (!this.registry.has(name)) {
            throw new Error(`Service ${name} not registerd`);
        }

        const { factory, isSingleton } = this.registry.get(name);

        if (isSingleton) {
            if (!this.instances.has(name)) {
                this.instances.set(name, factory(this));
            }
            return this.instances.get(name);
        }

        return factory(this);
    }

}

const container = new DIContainer();

container.register('logger', () => {
    return {
        log: console.log,
        error: console.error
    };

}, true);

container.register('apiClient', (container) => {
    const logger = container.resolve('logger');
    return {
        fetchData: () => {
            logger.log('Fetching data...');
            return Promise.resolve({ data: 'sample' });
        }
    };
});

const client1 = container.resolve('apiClient');
const client2 = container.resolve('apiClient');
console.log(client1 === client2);

const logger1 = container.resolve('logger');
const logger2 = container.resolve('logger');
console.log(logger1 === logger2)

