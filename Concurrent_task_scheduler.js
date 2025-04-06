class TaskScheduler {
    constructor(concurrency = 1) {
        this.queue = [];
        this.running = 0;
        this.concurrency = concurrency;
    }

    add(task, priority = 0) {
        return new Promise((resolve, reject)=>{
            const taskWrapper = { task, priority, resolve, reject };

            let i = 0;
            while ( i < this.queue.length && this.queue[i].priority >= priority) {
                i++;

            }
            this.queue.splice(i, 0, taskWrapper);

            this._run();
        });

    }
    async _run() {
        while (this.running < this.concurrency && this.queue.length > 0) {
            this.running++;
            const { task, resolve, reject } = this.queue.shift();

            try {
                const result = await task();
                resolve(result);
            } catch (error) {
                reject(error);
            } finally{
                this.running--;
                this._run();
            }

        }
    }
}

const scheduler = new TaskScheduler(2);

scheduler.add(() => DelayNode(1000).then(() => 'Low Priority'), 1);
scheduler.add(() => DelayNode(500).then(() => 'High Priority'), 10);
scheduler.add(() => DelayNode(800).then(() => 'Medium priority'), 5);