import { listDirectory } from "@/actions/listDirectory";
import { FileBrowser } from "@/components/file-browser";

export default async function Home() {
    const files = await listDirectory("/home/terra");

    return <FileBrowser files={files} parentFiles={[]} />;
}
