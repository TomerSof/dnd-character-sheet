import React, { useState } from "react";

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
  // Initialize state: map level to total and expended counts
  const [slots, setSlots] = useState(() => {
    const initial = new Map<number, { total: number; expended: number }>();
    [
      { level: 1, total: 4, expended: 0 },
      { level: 2, total: 3, expended: 0 },
      { level: 3, total: 3, expended: 0 },
      { level: 4, total: 3, expended: 0 },
      { level: 5, total: 3, expended: 0 },
      { level: 6, total: 2, expended: 0 },
      { level: 7, total: 2, expended: 0 },
      { level: 8, total: 2, expended: 0 },
      { level: 9, total: 2, expended: 0 },
    ].forEach(({ level, total, expended }) => {
      initial.set(level, { total, expended });
    });
    return initial;
  });

  const handleTotalChange = (level: number, value: string) => {
    const total = Math.max(0, Math.min(4, Number(value) || 0)); // max 4 instead of 20
    setSlots((prev) => {
      const current = prev.get(level) || { total: 0, expended: 0 };
      const newExpended = Math.min(current.expended, total);
      const newMap = new Map(prev);
      newMap.set(level, { total, expended: newExpended });
      return newMap;
    });
  };

  const handleExpendedToggle = (level: number, index: number) => {
    setSlots((prev) => {
      const current = prev.get(level) || { total: 0, expended: 0 };
      let newExpended = current.expended;

      if (index < current.expended) {
        // Uncheck: reduce expended count to index
        newExpended = index;
      } else {
        // Check: increase expended count to index + 1
        newExpended = index + 1;
      }

      if (newExpended > current.total) newExpended = current.total;

      const newMap = new Map(prev);
      newMap.set(level, { total: current.total, expended: newExpended });
      return newMap;
    });
  };

  // Split levels into 3 columns
  const allLevels = Array.from(slots.entries())
    .map(([level, vals]) => ({ level, ...vals }))
    .sort((a, b) => a.level - b.level);

  const cols: { level: number; total: number; expended: number }[][] = [
    [],
    [],
    [],
  ];
  allLevels.forEach((lvl, idx) => {
    cols[idx % 3].push(lvl);
  });

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
          {col.map(({ level, total, expended }) => (
            <SpellSlotLevel
              key={level}
              level={level}
              totalSlots={total}
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
