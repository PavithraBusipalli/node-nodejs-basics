import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const filepath = path.join(dirname, 'files', 'archieve.gz');
const decompressedFilePath = path.join(dirname, 'files', 'fileToCompress.txt');
const decompress = async () => {
    const gunzip = zlib.createGunzip();
    const sourceStream = fs.createReadStream(filepath);
    const destinationStream = fs.createWriteStream(decompressedFilePath);
    sourceStream.pipe(gunzip)
                .pipe(destinationStream)
                .on('finish', () => {
                    console.log('file decompressed');
                })
};

await decompress();