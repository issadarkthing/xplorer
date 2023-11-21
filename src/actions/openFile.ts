"use server";
import { promisify } from "util";
import childProcess from "child_process";

const exec = promisify(childProcess.exec);

export async function openFile(filepath: string) {
    await exec(`brave "${filepath}"`);
}
