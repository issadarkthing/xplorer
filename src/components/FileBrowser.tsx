"use client";
import { listDirectory } from "@/actions/listDirectory";
import { openFile } from "@/actions/openFile";
import FileItem from "@/components/FileItem";
import { File } from "@/models/File";
import { useEffect, useState } from "react";
import path from "path";
import { FileSearch } from "./FileSearch";

interface FileBrowserProps {
    homedir: string;
}

export function FileBrowser({ homedir }: FileBrowserProps) {
    const [filepath, setFilepath] = useState(homedir);
    const [files, setFiles] = useState<File[]>([]);
    const [filteredFiles, setFilteredFiles] = useState<File[]>([]);

    useEffect(() => {
        (async () => {
            const files = await listDirectory(filepath);
            setFiles(files);
            setFilteredFiles(files);
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

    const onQueryChange = (input: string) => {
        if (input === "") {
            setFilteredFiles(files);
        } else {
            const pattern = new RegExp(input, "gi");
            const filtered = files.filter((file) => {
                return pattern.test(file.name);
            });

            setFilteredFiles(filtered);
        }
    };

    return (
        <div className="flex w-full min-h-screen">
            <div className="p-10 border-r border-slate-800">
                <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-cyan-400">
                        XPLORER
                    </span>
                </h1>
            </div>
            <div className="flex flex-col w-full">
                <FileSearch onChange={onQueryChange} />
                <div className="flex w-full h-12 items-center px-5 mt-5 gap-5">
                    <button
                        className="ml-6 border-slate-800 hover:bg-slate-800 rounded-lg px-4 py-2"
                        onClick={onMoveUpDirectory}
                    >
                        <IconBack />
                    </button>
                    <span className="text-slate-200 font-mono text-lg">
                        {filepath}
                    </span>
                </div>
                <div className="flex flex-wrap m-5">
                    {filteredFiles.map((file) => (
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

function IconBack() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-slate-200"
            fill="currentColor"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 448 512"
        >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
    );
}
