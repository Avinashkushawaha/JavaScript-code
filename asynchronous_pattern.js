getData((data) => {
    processData(data, (processData) => {
        saveData (processData, () => {
            console.log('Done');
        });
    });
});

async function handlerData() {
    const data = await getData();
    const processData = await processData(data);
    await saveData(processData);
    console.log('Done');
}