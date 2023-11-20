"use server";
import fs from "fs/promises";

export async function listDirectory(path: string) {
    return await fs.readdir(path);
}
