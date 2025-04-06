class WorkerWrapper {
    constructor(workerUrl) {
        this.worker = new Worker(this.worker);
        this.callbacks = new Map();
        this.id = 0;

        this.worker.onmessage = (e) => {
            const { id, error, result } = e.data;
            const callback = this.callbacks.get(id);

            if (callback) {
                if(error) {
                    callback.reject(new Error(error));
                } else {
                    callback.resolve(result);
                }
                this.callbacks.delete(id);
            }
        };
    }

    postMessage(message, transfer = []) {
        return new Promise((resolve, reject) => {
            const id = this.id++;
            this.callbacks.set(id, { resolve, reject});
            this.worker.postMessage({ id, message }, transfer);
        });
    }

    terminate() {
        this.worker.terminate();
    }
}

const worker = new WorkerWrapper('worker.js')
try {
    const result = await worker.postMessage({ task: 'processData', data: largeArray});
    console.log(result);
} catch (err) {
    console.error('Worker error:', err);
}
