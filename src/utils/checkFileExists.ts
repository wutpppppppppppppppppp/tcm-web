import fs from 'node:fs';
import path from 'node:path';

/**
 * Checks if a file exists in the "public" folder.
 * @param filePath The relative path to the file in the public folder (e.g., `/assets/images/example.jpeg`).
 * @returns True if the file exists, false otherwise.
 */
export const checkFileExists = (filePath: string): boolean => {
  const absolutePath = path.join(process.cwd(), 'public', filePath);
  return fs.existsSync(absolutePath);
};
