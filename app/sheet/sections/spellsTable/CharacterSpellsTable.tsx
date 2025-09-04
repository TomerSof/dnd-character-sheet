
import { BookmarkPlus } from "lucide-react";
import React from "react";
import { useSpellTableContext } from "@/app/contexts/SpellTableContext";
import SpellTableRow from "./SpellTableRow";

export default function CharacterSpellsTable() {
  const { validationError, tableSearch, addNewSpell } = useSpellTableContext();

  return (
    <div className="overflow-x-auto bg-primary/60">
      <table className="table table-xs border-collapse  mt-2 ">
        <thead>
          <tr className="bg-secondary/60 font-fantasy text-outline-primary-content border-b-2 border-secondary text-primary text-lg text-center underline">
            <th></th>
            <th>Level</th>
            <th>Spell Name</th>
            <th>Cost</th>
            <th>Casting Time</th>
            <th>Range</th>
            <th>Concentration</th>
            <th>Ritual</th>
            <th>Required Material</th>
            <th>Notes</th>
            <th className="flex justify-center">
              <BookmarkPlus
                className="fill-success size-8 cursor-pointer"
                onClick={addNewSpell}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={11} className="h-3"></td>
          </tr>
          {tableSearch.map((tSpell) => (
            <SpellTableRow key={tSpell.spell.id} tSpell={tSpell} />
          ))}
        </tbody>
      </table>
      {validationError && (
        <div className="toast toast-top toast-center whitespace-pre-line ">
          <div className="alert alert-warning ">
            <span className="text-center">{validationError}</span>
          </div>
        </div>
      )}
    </div>
  );
}
