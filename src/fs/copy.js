import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    try {
        // Check if source folder exists
        const sourceExists = await fs.stat(sourceDir).catch(() => false);
        if (!sourceExists) {
            throw new Error('FS operation failed');
        }

        // Check if destination folder already exists
        const destExists = await fs.stat(destDir).catch(() => false);
        if (destExists) {
            throw new Error('FS operation failed');
        }

        // Create destination folder
        await fs.mkdir(destDir);

        // Read files from source folder
        const files = await fs.readdir(sourceDir);

        // Copy each file to the destination folder
        for (const file of files) {
            const sourceFile = path.join(sourceDir, file);
            const destFile = path.join(destDir, file);

            const fileStat = await fs.stat(sourceFile);
            if (fileStat.isFile()) {
                await fs.copyFile(sourceFile, destFile);
            } else if (fileStat.isDirectory()) {
                // Recursively copy subdirectories
                await copyFolder(sourceFile, destFile);
            }
        }
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

// Helper function to copy folders recursively
const copyFolder = async (source, destination) => {
    await fs.mkdir(destination);
    const items = await fs.readdir(source);

    for (const item of items) {
        const sourceItem = path.join(source, item);
        const destItem = path.join(destination, item);

        const itemStat = await fs.stat(sourceItem);
        if (itemStat.isFile()) {
            await fs.copyFile(sourceItem, destItem);
        } else if (itemStat.isDirectory()) {
            await copyFolder(sourceItem, destItem);
        }
    }
};

await copy();