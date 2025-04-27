import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filepath = fileURLToPath(import.meta.url);
const dirname = path.dirname(filepath);
const deletefilepath = path.join(dirname, 'files', 'fileToRemove.txt')
console.log(deletefilepath);
const remove = async () => {
    try {
        await fs.promises.access(deletefilepath);
        await fs.promises.unlink(deletefilepath);
    } catch(error) {
        if(error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        } 
        throw error;
    }
};  

await remove();