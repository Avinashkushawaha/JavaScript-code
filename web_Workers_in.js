const worker = new Worker('worker.js');
worker.postMessage('Start');
worker.onmessage = (event) => {
  console.log("Message from worker:", event.data);
};

