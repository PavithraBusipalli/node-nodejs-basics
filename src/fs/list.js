import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filePath = fileURLToPath(import.meta.url);
const folderPath = path.join(path.dirname(filePath), 'files');
console.log(folderPath);
const list = async () => {
    try {
        await fs.promises.access(folderPath);
        const files = await fs.promises.readdir(folderPath);
    } catch(error) {
        if(error.code === 'ENOENT') {
            throw new Error('FS operation failed')
        }
        throw error;
    }
};

await list();