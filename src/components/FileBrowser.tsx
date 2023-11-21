"use client";
import { listDirectory } from "@/actions/listDirectory";
import { openFile } from "@/actions/openFile";
import { File } from "@/models/File";
import { useEffect, useState } from "react";
import path from "path";

export function FileBrowser() {
    const [filepath, setFilepath] = useState("/home/terra");
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        (async () => {
            setFiles(await listDirectory(filepath));
        })();
    }, [filepath]);

    const onEnterDirectory =
        (file: File) => (e: React.MouseEvent<HTMLButtonElement>) => {
            if (e.detail === 2 && file.isDirectory) {
                setFilepath(path.join(filepath, file.name));
            } else if (e.detail === 2 && !file.isDirectory) {
                openFile(path.join(filepath, file.name));
            }
        };

    const onMoveUpDirectory = () => {
        setFilepath(path.join(filepath, ".."));
    };

    return (
        <div className="flex w-full">
            <div className="p-10 border-r border-slate-800">
                <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-cyan-400">
                        XPLORER
                    </span>
                </h1>
            </div>
            <div className="flex flex-col">
                <div className="flex w-full h-12 items-center px-5 mt-5 gap-10">
                    <button
                        className="border border-slate-800 hover:bg-slate-800 rounded-lg px-4 py-2"
                        onClick={onMoveUpDirectory}
                    >
                        <IconBack />
                    </button>
                    <span className="text-slate-200 font-mono text-lg">
                        {filepath}
                    </span>
                </div>
                <div className="flex flex-wrap m-5">
                    {files.map((file) => (
                        <button
                            onClick={onEnterDirectory(file)}
                            className="hover:bg-slate-800 flex flex-col justify-center items-center h-40 w-40 m-2 p-4 border-slate-800 rounded-2xl"
                            key={file.name}
                        >
                            {file.isDirectory ? <IconFolder /> : <IconFile />}
                            <div className="w-24 whitespace-nowrap text-ellipsis overflow-hidden text-slate-200">
                                <span>{file.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function IconFolder() {
    return (
        <svg
            className="h-24 w-24 text-amber-100"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
    );
}

function IconFile() {
    return (
        <svg
            className="h-24 w-24 text-slate-200"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    );
}

function IconSearch() {
    return (
        <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function IconBack() {
    return (
        <svg
            className="w-6 h-6 text-slate-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
        </svg>
    );
}
