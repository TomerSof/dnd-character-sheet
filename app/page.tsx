import Sheet from "./sheet/sheet";
import { CharacterProvider } from "./contexts/CharacterContext";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-17">
        <Sheet />
      </main>
    </>
  );
}
