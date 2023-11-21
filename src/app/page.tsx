import { FileBrowser } from "@/components/FileBrowser";
import { homeDir } from "@/actions/homeDir";

export default async function Home() {
    const home = await homeDir();
    return <FileBrowser homedir={home} />;
}
