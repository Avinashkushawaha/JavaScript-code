async function processInChunks(array, chunkSize, processItem, delayMs = 0) {
    for (let i = 0; i < array.length; i += chunkSize ){
        const chunk = array.slice(i, i + chunkSize);

        await Promise.all(chunk.map(item => processItem(item)));

        if (delayMs > 0) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}

const largeArray = Array(10000).fill().map((_, i) => i);
await processInChunks(largeArray, 100, async num => {
    console.log(num);

}, 50);