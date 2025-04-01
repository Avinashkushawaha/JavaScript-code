let promise = new Promise((resolve, reject) =>{
    let success = true;
    if(success) {
        resolve("Data fetched successfully");

    } else {
         reject("Error fetching data")
    }
});

promise.then(result => console.log(result))
       .catch(error => console.log(error));