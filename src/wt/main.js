import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
    const numCores = os.cpus().length;
    const workers = [];
    const results = [];

    const filename = fileURLToPath(import.meta.url);
    const dirname = path.dirname(filename);
    const workerPath = path.join(dirname, 'worker.js');

    for (let i = 0; i < numCores; i++) {
        const worker = new Worker(workerPath); 
        workers.push(worker);

        worker.postMessage(10 + i);

        worker.on('message', (message) => {
            results[i] = message;
            if (results.length === numCores && results.every((res) => res !== undefined)) {
                console.log(results); 
            }
        });

        worker.on('error', () => {
            results[i] = { status: 'error', data: null };
            if (results.length === numCores && results.every((res) => res !== undefined)) {
                console.log(results); 
            }
        });

        worker.on('exit', (code) => {
            if (code !== 0) {
                console.error(`Worker stopped with exit code ${code}`);
            }
        });
    }
};

await performCalculations();