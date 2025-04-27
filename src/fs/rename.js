import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const oldfilepath = path.join(dirname, 'files', 'wrongFilename.txt');
const newfilepath = path.join(dirname, 'files', 'properFilename.md');
const rename = async () => {
    try {
        await fs.promises.access(oldfilepath);
        await fs.promises.access(newfilepath);
        throw new Error('FS operation failed');
    } catch(error) {
        if(error.code !== 'ENOENT') {
            throw error;
        } 
        if(error.message === 'FS operation failed') {
            throw error;
        } 
        await fs.promises.rename(oldfilepath, newfilepath);
    }
};

await rename();