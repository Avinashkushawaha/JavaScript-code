import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow=models/mobilenet';

class ImageClassifier {
    constructor() {
        this.model = null;
        this.isloading = false;
    }

    async load() {
     this.isloading = true;
     try {
        await tf.ready();
        this.model = await mobilenet.load();
        this.isloading = false;
        return true;
     } catch (err) {
        console.error('Failed to load model:', err);
        this.isloading = false;
        return false;
     }
    }

    async classify(ImageElement, topK = 3){
        if (!this.model){
            throw new Error('Model not loaded. Call load() first.');
        }

        if (!(ImageElement instanceof HTMLImageElement)) {
        throw new Error('Input must be an HTMLImageElement');
        }

        const predictions = await this.model.classify(ImageElement, topK);
        return predictions.map(pred => ({
            className: pred.className,
            probability: Math.round(pred.probability * 100)
        }));
    }
}

const classifier = new ImageClassifier();
const img = document.getElementById('image-to-classify');

async function runClassification(){
    const loaded = await classifier.load();
    if (loaded) {
        const results = await classifier.classify(img);
        console.log('Classification results:', results);
    }
}

runClassification();