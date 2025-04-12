async function loadWasm() {

    const response = await fetch('add.wasm');
    const buffer = await response.arrayBuffer();
    const module = await WebAssembly.compile(buffer);
    const instance = await WebAssembly.instantiate(module);

    return {
        add: instance.exports.add
    };
}

loadWasm().then(({ add }) => {
    console.log('WASM Add:', add(5, 7));
});

async function loadWasmStreaming() {
    const { instance } = await WebAssembly.instantiateStreaming(
        fetch('add.wasm')
    );
    return {
      add: instance.exports.add
    };
    
}