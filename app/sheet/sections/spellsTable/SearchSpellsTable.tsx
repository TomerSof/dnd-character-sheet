import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CharacterSpellsTable from "./CharacterSpellsTable";
import { SpellCost, SpellLevel, SpellSearchParams } from "@/app/sheet/types";
import {
  SpellTableContext,
  SpellTableProvider,
} from "@/app/contexts/SpellTableContext";

export default function SearchSpellsTable() {
  return (
    <div className="w-full mt-5 mb-15">
      <SpellTableProvider>
        <SearchBar />
        <CharacterSpellsTable />
      </SpellTableProvider>
    </div>
  );
}
