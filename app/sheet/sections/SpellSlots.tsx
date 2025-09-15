import { useCharacter } from "@/app/contexts/CharacterContext";
import React from "react";

type SpellSlotLevelProps = {
  level: number;
  totalSlots: number;
  expendedSlots: number;
  onTotalChange: (level: number, value: string) => void;
  onExpendedToggle: (level: number, index: number) => void;
};

function SpellSlotLevel({
  level,
  totalSlots,
  expendedSlots,
  onTotalChange,
  onExpendedToggle,
}: SpellSlotLevelProps) {
  return (
    <label className="input p-1 flex flex-row self-center h-full gap-2">
      <span className="w-20">Level {level}</span>
      <div className="flex flex-wrap gap-1 justify-center w-full h-full">
        <p className="w-full text-xs text-center underline">Max Slots</p>
        <input
          type="number"
          min={0}
          max={20}
          placeholder="Total"
          className="text-center input-ghost w-16 min-w-[4rem] max-w-[4rem] box-border"
          value={totalSlots}
          onChange={(e) => onTotalChange(level, e.target.value)}
        />
      </div>
      <div className="flex gap-1 justify-center w-full mr-1 h-full flex-nowrap">
        {[...Array(totalSlots)].map((_, i) => (
          <input
            key={i}
            type="checkbox"
            className="checkbox border-base-300 bg-neutral-500 checked:border-current checked:bg-secondary checked:text-secondary-content"
            checked={i < expendedSlots}
            onChange={() => onExpendedToggle(level, i)}
          />
        ))}
      </div>
    </label>
  );
}

export default function SpellSlots() {
  const { spellSlots, character, setCharacter } = useCharacter();

  const handleTotalChange = (level: number, value: string) => {
    const total = Math.max(0, Math.min(20, Number(value) || 0));
    const updatedSlots = (character.spellSlots || []).map((slot) =>
      slot.level === level
        ? { ...slot, max: total, expended: Math.min(slot.expended, total) }
        : slot
    );
    setCharacter({ ...character, spellSlots: updatedSlots });
  };

  const handleExpendedToggle = (level: number, index: number) => {
    const updatedSlots = (character.spellSlots || []).map((slot) => {
      if (slot.level !== level) return slot;
      let expended = slot.expended;
      expended = index < expended ? index : index + 1;
      expended = Math.min(expended, slot.max);
      return { ...slot, expended };
    });
    setCharacter({ ...character, spellSlots: updatedSlots });
  };

  // Split levels into 3 columns
  const cols: { level: number; max: number; expended: number }[][] = [
    [],
    [],
    [],
  ];
  spellSlots
    .slice()
    .sort((a, b) => a.level - b.level)
    .forEach((slot, i) => cols[i % 3].push(slot));

  return (
    <div className="grid grid-cols-3 my-2 border-2 rounded-2xl bg-primary/60 border-secondary box-border text-center items-center gap-y-1">
      <p className="col-span-3 w-max mx-auto font-bold border-b bg-secondary/60 m-2 font-fantasy text-primary text-outline-primary-content text-xl rounded-lg pb- px-5">
        Spell Slots
      </p>

      {cols.map((col, colIdx) => (
        <div
          key={colIdx}
          className="flex flex-col px-3 gap-2 py-2 bg-secondary/60 box-border border-t mx-2 rounded-lg mb-2"
        >
          {col.map(({ level, max, expended }) => (
            <SpellSlotLevel
              key={level}
              level={level}
              totalSlots={max} // <-- use `max` here
              expendedSlots={expended}
              onTotalChange={handleTotalChange}
              onExpendedToggle={handleExpendedToggle}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
