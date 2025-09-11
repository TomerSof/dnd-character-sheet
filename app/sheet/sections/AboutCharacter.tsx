import React from "react";
import { CharacterData } from "../types";

interface AboutCharacterProps {
  backstory: string;
  appearance: string;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterData>>;
}

export default function AboutCharacter({
  backstory,
  appearance,
  setCharacter,
}: AboutCharacterProps) {
  return (
    <div className="flex flex-row justify-center gap-5">
      <div className="w-full text-center">
        <p className="text-secondary font-fantasy text-outline-secondary-content font-bold text-3xl underline mb-2">
          Backstory & Personality
        </p>
        <textarea
          placeholder="Describe your character's backstory and personality"
          className="textarea w-full textarea-primary border-3 border-primary bg-primary/30"
          value={backstory}
          onChange={(e) =>
            setCharacter((prev) => ({ ...prev, backstory: e.target.value }))
          }
        ></textarea>
      </div>

      <div className="w-full text-center">
        <p className="text-secondary font-fantasy text-outline-secondary-content font-bold text-3xl underline mb-2">
          Appearance
        </p>
        <textarea
          placeholder="Describe your character's appearance"
          className="textarea w-full textarea-primary border-3 border-primary bg-primary/30"
          value={appearance}
          onChange={(e) =>
            setCharacter((prev) => ({ ...prev, appearance: e.target.value }))
          }
        ></textarea>
      </div>
    </div>
  );
}
