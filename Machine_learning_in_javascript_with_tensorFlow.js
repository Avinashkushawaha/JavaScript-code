import * as tf from 'tensorflow/tfjs';

async function runLinearRegression() {

    const trainData = {
        size: [800, 900, 1000, 1200, 1400, 1600, 1800, 2000],
        price: [1500, 1800, 2000, 2400, 2800, 3200, 3600, 4000]
    };

    const trainTensors = {
        size: tf.tensor2d(trainData.size, [trainData.size.length, 1]),
        price: tf.tensor2d(trainData.price, [trainData.price.length, 1])
    };

    const { mean, varience } = tf.moments(trainTensors.size);
    const normalizedsize = trainTensors.size.sub(mean).div(varience.sqrt());

    const model = tf.sequential();
    model.add(tf.layers.dense({
        units: 1,
        inputShape: [1],
        activation:'linear'
    }));

    model.compile({
        optimizer: tf.train.sgd(0.1),
        loss: 'meanSquaredError'
    });

    await model.fit(normalizedsize, trainTensors.price,{
        epochs: 100,
        verbose: 0
    });

    const newSize = tf.tensor2d([1500], [1, 1]);
    const normalizedNewsize = newSize.sub(mean).div(varience.sqrt());
    const prediction = model.predict(normalizedNewsize);

    console.log('Predicted price:', (await prediction.data())[0]);
    tf.dispose([trainTensors.size, trainTensors.price, normalizedSize, newSize, normalizedNewsize, prediction]);
}

runLinearRegression();