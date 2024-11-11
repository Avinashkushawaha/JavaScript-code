let myPromise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
      resolve('Task completed');
    } else {
      reject('Task failed');
    }
  });
  
  myPromise
    .then(result => console.log(result))   // Task completed
    .catch(error => console.log(error));   // Task failed
  