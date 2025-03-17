document.querySelector("#parent").addEventListener("click", function(event) {
    if(event.target.matches(".child")) {
        console.log("Child clicked:", event.target.textContent);
    }
    });
