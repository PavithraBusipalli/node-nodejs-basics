import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const filePath = path.join(dirname, 'files', 'fresh.txt');
const create = async () => {
    try {
        await fs.promises.access(filePath);
        throw new Error('FS operation failed');
    } catch(e) {
        if(e.code === 'ENOENT') {
            fs.writeFileSync(filePath, 'I am fresh and young', 'utf-8');
        } else {
            throw e;
        }
    }
};

await create();