import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const filepath = path.join(dirname, 'files', 'fileToWrite.txt');
const write = async () => {
    const writableStream = fs.createWriteStream(filepath, 'utf-8');
    process.stdin.pipe(writableStream);
    writableStream.on('finish', () => {
        console.log("Data has been written to file successfully.");
    });
};

await write();