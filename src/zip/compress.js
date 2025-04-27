import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const filepath = path.join(dirname, 'files', 'FileToCompress.txt');
const destinationFilePath = path.join(dirname, 'files', 'archieve.gz');
const compress = async () => {
    const gzip = zlib.createGzip();
    const sourceStream = fs.createReadStream(filepath);
    const destinationStream = fs.createWriteStream(destinationFilePath);
    sourceStream.pipe(gzip)
                .pipe(destinationStream)
                .on('finish', () => {
                    console.log("File compress success")
                });
};

await compress();