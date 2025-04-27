import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const scriptPath = path.join(dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'],
    });
    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
    child.on('error', (error) => {
        console.log('Failed to start child process', error);
    });
    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);