import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filepath = fileURLToPath(import.meta.url);
const fileToReadPath = path.join(path.dirname(filepath), 'files', 'fileToRead.txt');
const read = async () => {
    try {
        await fs.promises.access(fileToReadPath);
        const fileContent = await fs.promises.readFile(fileToReadPath, 'utf-8');
        console.log(fileContent);
    } catch(error) {
        if(error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await read();