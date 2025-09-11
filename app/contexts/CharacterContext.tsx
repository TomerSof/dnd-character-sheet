"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import { CharacterData, Spell } from "../sheet/types";
import { stat } from "fs";

const defaultCharacter = {
  name: "",
  species: "",
  classType: "",
  subclass: "",
  background: "",
  backstory: "",
  appearance: "",
  level: 1,
  xp: 0,
  maxHP: 0,
  currentHP: 0,
  tmpHP: 0,
  hitDiceMax: 0,
  hitDiceSpent: 0,
  size: 0,
  spellCasting: {
    ability: "",
    abilityMod: 0,
    spellSaveDC: 0,
    spellAttackBonus: 0,
  },

  coins: [
    { name: "Copper Piece", token: "cp", count: 0, valueInGP: 0.01 },
    { name: "Silver Piece", token: "sp", count: 0, valueInGP: 0.1 },
    { name: "Electrum Piece", token: "ep", count: 0, valueInGP: 0.5 },
    { name: "Gold Piece", token: "gp", count: 0, valueInGP: 1 },
    { name: "Platinum Piece", token: "pp", count: 0, valueInGP: 10 },
  ],
  traits: [
    { name: "Passive Perception", baseValue: 0, bonusValue: 0 },
    { name: "Armor Class", baseValue: 0, bonusValue: 0 },
    { name: "Proficiency Bonus", baseValue: 0, bonusValue: 0 },
    { name: "Initiative", baseValue: 0, bonusValue: 0 },
    { name: "Speed", baseValue: 0, bonusValue: 0 },
  ],

  stats: [
    {
      name: "Strength",
      abbreviation: "STR",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [
        { name: "Athletics", baseValue: 0, isProficient: false, bonusValue: 0 },
      ],
    },
    {
      name: "Dexterity",
      abbreviation: "DEX",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [
        {
          name: "Acrobatics",
          baseValue: 0,
          isProficient: false,
          bonusValue: 0,
        },
        {
          name: "Sleight Of Hand",
          baseValue: 0,
          isProficient: false,
          bonusValue: 0,
        },
        { name: "Stealth", baseValue: 0, isProficient: false, bonusValue: 0 },
      ],
    },
    {
      name: "Constitution",
      abbreviation: "CON",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [],
    },
    {
      name: "Intelligence",
      abbreviation: "INT",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [
        { name: "Arcana", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "History", baseValue: 0, isProficient: false, bonusValue: 0 },
        {
          name: "Investigation",
          baseValue: 0,
          isProficient: false,
          bonusValue: 0,
        },
        { name: "Nature", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Religion", baseValue: 0, isProficient: false, bonusValue: 0 },
      ],
    },
    {
      name: "Wisdom",
      abbreviation: "WIS",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [
        {
          name: "Animal Handling",
          baseValue: 0,
          isProficient: false,
          bonusValue: 0,
        },
        { name: "Insight", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Medicine", baseValue: 0, isProficient: false, bonusValue: 0 },
        {
          name: "Perception",
          baseValue: 0,
          isProficient: false,
          bonusValue: 0,
        },
        { name: "Survival", baseValue: 0, isProficient: false, bonusValue: 0 },
      ],
    },
    {
      name: "Charisma",
      abbreviation: "CHA",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [
        { name: "Deception", baseValue: 0, isProficient: false, bonusValue: 0 },
        {
          name: "Intimidation",
          baseValue: 0,
          isProficient: false,
          bonusValue: 0,
        },
        {
          name: "Performance",
          baseValue: 0,
          isProficient: false,
          bonusValue: 0,
        },
        {
          name: "Persuasion",
          baseValue: 0,
          isProficient: false,
          bonusValue: 0,
        },
      ],
    },
  ],
  spells: [],
};

type CharacterContextType = CharacterData & {
  character: CharacterData;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterData>>;
  checkingSavingThrow: (index: number) => void;
  checkingSkill: (statIdx: number, skillIdx: number) => void;
  onTraitValueChange: (index: number, updatedValue: number) => void;
  onStatChange: (index: number, updateValue: number) => void;
  updateCoins: (
    add: Record<string, number>,
    subtract: Record<string, number>
  ) => void;
  setSpellCasting: (ability: string) => void;
  addSpell: (spell: Spell) => void;
  removeSpell: (spellID: string) => void;
  updateSpell: (spellID: string, newSpell: Spell) => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [character, setCharacter] = useState<CharacterData>(defaultCharacter);

  const setSpellCasting = (ability: string) => {
    const characterStat = character.stats.find(
      (stat) => stat.abbreviation == ability
    )!;
    const proficiencyBonus = character.traits[2].baseValue;
    const abilityInfo = {
      ability: ability,
      abilityMod: characterStat.modValue,
      spellSaveDC: 8 + proficiencyBonus + characterStat.modValue,
      spellAttackBonus: proficiencyBonus + characterStat.modValue,
    };
    setCharacter({ ...character, spellCasting: abilityInfo });
  };

  const checkingSavingThrow = (index: number) => {
    const updatedIsProficient =
      !character.stats[index].savingThrow.isProficient;
    let savingThrowBonusValue = character.stats[index].savingThrow.bonusValue;

    // Update Proficiency Bonus value
    updatedIsProficient
      ? (savingThrowBonusValue += character.traits[2].baseValue)
      : (savingThrowBonusValue -= character.traits[2].baseValue);

    const thisUpdatedStat = {
      isProficient: updatedIsProficient,
      baseValue: character.stats[index].savingThrow.baseValue,
      bonusValue: savingThrowBonusValue,
    };
    const updatedStats = [...character.stats];
    updatedStats[index] = {
      ...updatedStats[index],
      savingThrow: thisUpdatedStat,
    };

    setCharacter({ ...character, stats: updatedStats });
  };

  const checkingSkill = (statIdx: number, skillIdx: number) => {
    const updatedIsProficient =
      !character.stats[statIdx].skills[skillIdx].isProficient;
    let skillBonusValue = character.stats[statIdx].skills[skillIdx].bonusValue;

    // Update Proficiency Bonus value
    updatedIsProficient
      ? (skillBonusValue += character.traits[2].baseValue)
      : (skillBonusValue -= character.traits[2].baseValue);

    const updatedStats = [...character.stats];
    updatedStats[statIdx].skills[skillIdx].bonusValue = skillBonusValue;
    updatedStats[statIdx].skills[skillIdx].isProficient = updatedIsProficient;

    setCharacter({ ...character, stats: updatedStats });
  };

  const onTraitValueChange = (index: number, updatedValue: number) => {
    const updatedTraits = [...character.traits];
    updatedTraits[index] = { ...updatedTraits[index], baseValue: updatedValue };

    // If changing Proficiency Bonus
    if (index === 2) {
      const updatedStats = character.stats.map((stat) => {
        const updatedSkills = stat.skills.map((skill) =>
          skill.isProficient ? { ...skill, bonusValue: updatedValue } : skill
        );

        const updatedSavingThrow = stat.savingThrow.isProficient
          ? { ...stat.savingThrow, bonusValue: updatedValue }
          : stat.savingThrow;

        return {
          ...stat,
          skills: updatedSkills,
          savingThrow: updatedSavingThrow,
        };
      });

      setCharacter({
        ...character,
        traits: updatedTraits,
        stats: updatedStats,
      });
    } else {
      setCharacter({ ...character, traits: updatedTraits });
    }
  };

  const onStatChange = (index: number, updateValue: number) => {
    const updatedStats = [...character.stats];
    const stat = updatedStats[index];

    const mod = Math.floor((updateValue - 10) / 2);
    const prof =
      character.traits.find((trait) => trait.name == "Proficiency Bonus")
        ?.baseValue ?? 0;
    updatedStats[index] = {
      ...stat,
      value: updateValue,
      modValue: mod,
      savingThrow: {
        ...stat.savingThrow,
        baseValue: mod,
      },
      skills: stat.skills.map((skill) => ({
        ...skill,
        baseValue: mod,
      })),
    };

    setCharacter({ ...character, stats: updatedStats });
  };

  const updateCoins = (
    add: Record<string, number>,
    subtract: Record<string, number>
  ) => {
    const updatedCoins = character.coins.map((coin) => {
      const addCount = add[coin.token] ?? 0;
      const subtractCount = subtract[coin.token] ?? 0;
      const newCount = coin.count + addCount - subtractCount;
      return { ...coin, count: newCount < 0 ? 0 : newCount };
    });
    setCharacter({ ...character, coins: updatedCoins });
  };

  const addSpell = (spell: Spell) => {
    setCharacter((prev) => ({ ...prev, spells: [...prev.spells, spell] }));
  };

  const removeSpell = (spellID: string) => {
    setCharacter((prev) => ({
      ...prev,
      spells: prev.spells.filter((s) => s.id !== spellID),
    }));
  };

  const updateSpell = (spellID: string, newSpell: Spell) => {
    setCharacter((prev) => ({
      ...prev,
      spells: prev.spells.map((s) => (s.id === spellID ? newSpell : s)),
    }));
  };

  return (
    <CharacterContext.Provider
      value={{
        ...character,
        character,
        setCharacter,
        checkingSavingThrow,
        checkingSkill,
        onTraitValueChange,
        onStatChange,
        updateCoins,
        setSpellCasting,
        addSpell,
        removeSpell,
        updateSpell,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context)
    throw new Error("useCharacter must be used within a CharacterProvider");
  return context;
};
