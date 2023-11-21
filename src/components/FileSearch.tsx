interface FileSearchProps {
    onChange: (query: string) => void;
}

export function FileSearch({ onChange }: FileSearchProps) {
    return (
        <div className="flex items-center justify-center gap-4 py-6">
            <IconSearch />
            <input
                onChange={(el) => onChange(el.target.value)}
                className="focus:outline-none focus:ring-1 focus:ring-sky-600 px-4 text-slate-200 h-10 border rounded-lg border-slate-800 bg-slate-900 w-96"
            />
        </div>
    );
}

function IconSearch() {
    return (
        <svg
            className="text-slate-200 h-6 w-6"
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
