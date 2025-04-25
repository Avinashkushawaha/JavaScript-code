class WorkerThreadPool {
    constructor(poolSize, workerScript) {
        this.poolSize = poolSize;
        this.workerScript = workerScript;
        this.workers = [];
        this.taskQueue = [];
        this.workersStatus = [];

        for (let i = 0; i < poolSize; i++) {
            const worker = new Worker(workerScript);
            worker.onmessage = this._handleWorkerResponse.bind(this, i);
            this.workers.push(worker);
            this.workersStatus.push(false); // false means idle
        }
        }

        execute(taskData) {
            return new Promise((resolve, reject) => {
                this.taskQueue.push({
                    taskData,
                    resolve,
                    reject,
                    reject
                });
                this._processNextTask();
            });
        }

            _processNextTask() {
                if (this.taskQueue.length === 0) return;

                const  availableWorkerIndex = this.workersStatus.indexOf(false);    
            if (availableWorkerIndex === -1) return; 

            const task = this.taskQueue.shift();
            this.workersStatus[availableWorkerIndex] = true;

            this.workers[availableWorkerIndex].postMessage(task.taskData);

            task.workerIndex = availableWorkerIndex; 
    
            }
            
        }
    
