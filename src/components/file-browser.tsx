interface FileBrowserProps {
    parentFiles: string[];
    files: string[];
}

export function FileBrowser({ files }: FileBrowserProps) {
    return (
        <div className="flex w-full">
            <div className="w-1/6 p-10 border-r border-slate-800">
                <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-red-600 from-cyan-400">
                        XPLORER
                    </span>
                </h1>
            </div>
            <div className="flex flex-wrap m-5">
                {files.map((file) => (
                    <div
                        className="flex flex-col justify-center items-center h-40 w-40 m-2 p-4 border-slate-800 rounded-lg"
                        key={file}
                    >
                        <IconFile />
                        <div className="w-24 flex flex-row justify-center">
                            <span className="text-slate-200 text-ellipsis overflow-hidden">
                                {file}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function IconFolder() {
    return (
        <svg
            className="mr-3 h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            className="h-24 w-24 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            height="24"
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
