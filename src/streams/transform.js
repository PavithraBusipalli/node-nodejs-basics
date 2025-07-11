import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const reversedChunk = chunk.toString().split('').reverse().join('');
            callback(null, reversedChunk);
        }
    });

    process.stdin.pipe(reverseTransform).pipe(process.stdout);};

await transform();