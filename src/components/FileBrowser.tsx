"use client";
import { listDirectory } from "@/actions/listDirectory";
import { openFile } from "@/actions/openFile";
import FileItem from "@/components/FileItem";
import { File } from "@/models/File";
import { useEffect, useState } from "react";
import path from "path";

interface FileBrowserProps {
    homedir: string;
}

export function FileBrowser({ homedir }: FileBrowserProps) {
    const [filepath, setFilepath] = useState(homedir);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        (async () => {
            setFiles(await listDirectory(filepath));
        })();
    }, [filepath]);

    const onEnterDirectory = (
        e: React.MouseEvent<HTMLButtonElement>,
        file: File
    ) => {
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
                        <FileItem
                            key={file.name}
                            file={file}
                            onClick={onEnterDirectory}
                        />
                    ))}
                </div>
            </div>
        </div>
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
