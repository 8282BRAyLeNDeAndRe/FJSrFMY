// 代码生成时间: 2025-09-14 02:39:51
 * Features:
 * - Scans a given folder and its subfolders.
 * - Organizes files based on file type into specified directories.
 * - Error handling for file operations.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define the types for file organization
interface FileType {
    type: string;
    directory: string;
}

// Main class for the folder structure organizer
class FolderStructureOrganizer {
    private readonly rootFolder: string;
    private readonly fileTypes: {[key: string]: string};

    constructor(rootFolder: string, fileTypes: {[key: string]: string}) {
        this.rootFolder = rootFolder;
        this.fileTypes = fileTypes;
    }

    // Organize files in the root folder and its subfolders
    public async organizeFiles(): Promise<void> {
        try {
            const files = await this.#getFilesRecursively(this.rootFolder);
            await Promise.all(files.map(file => this.#moveFile(file)));
        } catch (error) {
            console.error('An error occurred during file organization:', error);
        }
    }

    // Get all files recursively from the root folder
    private async #getFilesRecursively(dir: string): Promise<string[]> {
        const dirents = await fs.readdir(dir, { withFileTypes: true });
        const files: string[] = [];
        for (const dirent of dirents) {
            const res = resolve(dir, dirent.name);
            if (dirent.isDirectory()) {
                files.push(...await this.#getFilesRecursively(res));
            } else if (dirent.isFile()) {
                files.push(res);
            }
        }
        return files;
    }

    // Move a file to the appropriate directory based on its type
    private async #moveFile(filePath: string): Promise<void> {
        const ext = path.extname(filePath);
        const fileTypeKey = Object.keys(this.fileTypes).find(key => key === ext);
        if (!fileTypeKey) {
            console.warn(`No directory specified for file extension ${ext}. Skipping...`);
            return;
        }
        const destinationDir = path.join(this.rootFolder, this.fileTypes[fileTypeKey]);
        await fs.mkdir(destinationDir, { recursive: true }); // Create directory if it doesn't exist
        const fileName = path.basename(filePath);
        const destinationPath = path.join(destinationDir, fileName);
        await fs.rename(filePath, destinationPath);
    }
}

// Usage example
(async () => {
    const organizer = new FolderStructureOrganizer(
        process.cwd(), // Current working directory as root folder
        {
            '.txt': 'TextFiles',
            '.jpg': 'Images',
            '.png': 'Images',
            '.js': 'JavaScript',
            '.ts': 'TypeScript',
        }
    );

    await organizer.organizeFiles();
    console.log('Files have been organized.');
})();