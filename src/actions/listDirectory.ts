"use server";
import fs from "fs/promises";
import path from "path";

export async function listDirectory(filepath: string) {
    const filenames = await fs.readdir(filepath);
    const files = await Promise.all(
        filenames.map(async (filename) => {
            const fileStats = await fs.stat(path.join(filepath, filename));
            return { name: filename, isDirectory: fileStats.isDirectory() };
        })
    );

    return files;
}
