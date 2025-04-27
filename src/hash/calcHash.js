import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const calculateHash = async () => {
    const filename = fileURLToPath(import.meta.url);
    console.log(filename);
    const dirname = path.dirname(filename);

    const filePath = path.join(dirname, 'files', 'fileToCalculateHashFor.txt');

    const hash = createHash('sha256');
    const stream = fs.createReadStream(filePath);
    console.log('stream: ', stream);

    stream.on('data', (chunk) => {
        hash.update(chunk);
    });
    stream.on('end', () => {
        console.log(hash.digest('hex'));
    });

    stream.on('error', (error) => {
        console.error('Error reading the file:', error);
    });
};

await calculateHash();