"use server";
import os from "os";

export async function homeDir() {
    return os.homedir();
}
