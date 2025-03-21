const worker = new Worker('worker.js');
worker.postMessage('Start');
worker.onmessage = (event) => {
  console.log("Message from worker:", event.data);
};

self.onmessage = (event) => {
    console.log("Message from main script:", event.data);
    self.postMessage("Done");
};