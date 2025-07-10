import Image from "next/image";
import Sheet from "./sheet/sheet";
import { CharacterProvider } from "./sheet/characterContext";

export default function Home() {
  return (
    <CharacterProvider>
    <Sheet/>
    </CharacterProvider>
  );
}
