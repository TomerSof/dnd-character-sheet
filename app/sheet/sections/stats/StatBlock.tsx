// components/StatBlock.tsx
import React from "react";
import StatBlockSVG from "../../svg/StatBlockSVG";

interface StatBlockProps {
  statText: string;
  onStatChange?: (index: number, value: number) => void;
  statValue?: number;
  modifierValue: number;
  statIdx: number;
}

export default function StatBlock({
  statText,
  onStatChange,
  statValue,
  modifierValue,
  statIdx,
}: StatBlockProps) {
  const [localStatValue, setLocalStatValue] = React.useState(statValue);
  const [localModifierValue, setLocalModifierValue] =
    React.useState(modifierValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.valueAsNumber;
    if (isNaN(inputValue) || inputValue < 0) inputValue = 0;
    const updatedStatValue = Math.min(inputValue, 20);
    setLocalStatValue(updatedStatValue);
    const updatedModifier = Math.floor(((updatedStatValue ?? 0) - 10) / 2);
    setLocalModifierValue(updatedModifier);
    onStatChange?.(statIdx, updatedStatValue);
  };

  return (
    <div className="relative w-[70%] aspect-[142/175] text-shadow-accent-content">
      <StatBlockSVG className="w-full h-full absolute inset-0" />
      <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 font-bold font-fantasy text-outline-base-content text-secondary underline underline-offset-2">
        {statText}
      </div>
      <input
        type="number"
        value={localStatValue}
        onChange={handleChange}
        max={20}
        className="absolute text-primary-content  top-[25%] left-[14%] w-[70%] h-[30%] text-3xl text-center indent-[1rem] rounded-lg"
      />
      <div className="absolute bottom-[12%] left-[49.5%] transform -translate-x-1/2 text-info text-xl text-outline-primary-content">
        {localModifierValue}
      </div>
    </div>
  );
}
