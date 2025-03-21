getData((data) => {
    processData(data, (processData) => {
        saveData (processData, () => {
            console.log('Done');
        });
    });
});

