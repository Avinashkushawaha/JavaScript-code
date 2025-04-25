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
            _handleWorkerResponse(workerIndex, event) {
                const task = this._findTaskForWorker(workerIndex);
                if (!task) return ;
                   
                    this.workersStatus[workerIndex] = false; 

                    this.resolve(event.data); 

                    this._processNextTask();
                }

                _handleWorkerError(workerIndex, error) {
                    const task = this._findTaskForWorker(workerIndex);
                    if (!task) return ;

                    this.workersStatus[workerIndex] = false; 

                    task.reject(error); 

                    this._processNextTask();
                }
                _findTaskForWorker(workerIndex) {
                    return { resolve: () => {}, reject: () => {}};
                }

                _terminate() {
                    this.workers.forEach(worker => worker.terminate());
                    this.workers = [];
                    this.taskQueue = [];
                    this.workersStatus = [];
                }
            }

            const pool = new WorkerThreadPool(4, 'worker.js');

            const tasks = [1, 2, 3, 4, 5, 6, 7, 8].map(num =>
                pool.execute(num).then(result => {
                    console.log(`${num} * 2 = ${result}`);
                })
            );

            Promise.all(tasks).then(() => {
                console.log('All tasks completed');
                pool._terminate();
            });
        
    
