"use client";

import { CharacterProvider } from "./CharacterContext";
import { SessionProvider } from "./SessionContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CharacterProvider>{children}</CharacterProvider>
    </SessionProvider>
  );
}
