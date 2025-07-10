'use client';

import React, { ChangeEvent, useState } from "react";
import TopPageInfo from "./sections/topPageInfo";
import MedievalTitle from "./borders/medivalTitle";
import SpellSlots from "./sections/spellSlots";
import WaponsAndAttacksTB from "./sections/weaponsAndAttacksTB";
import TraitsBlock from "./borders/traitsBlock";
import StatsSection from "./sections/statsSection";
import ClassFeatures from "./sections/classFeatures";
import Feats from "./sections/feats";
import SpeciesTraits from "./sections/speciesTraits";
import TrainingAndProficiencies from "./sections/trainingAndProficiencies";
import EquipmentTable from "./sections/equipmentTable";
import BackgroundDecor from "./borders/backgroundDecor";
import CoinsBorder from "./borders/coinsBorder";
import CoinsModal from "./sections/coinsModal";
import PracticeComponent from "./practice/practiceComponent";
import ThemeController from "./themeController";

var defaultCharacter = {
  name: "",
  species: "",
  class: "",
  subclass: "",
  background: "",
  level: "",
  maxHP: 0,
  currentHP: 0,
  tmpHP: 0,
  hitDiceMax: 0,
  hitDiceSpent: 0,
  size: 0,
  coins: [
    { name: "Copper Piece", token: "cp", count: 0, valueInGP: 0.01 },
    { name: "Silver Piece", token: "sp", count: 0, valueInGP: 0.1 },
    { name: "Electrum Piece", token: "ep", count: 0, valueInGP: 0.5 },
    { name: "Gold Piece", token: "gp", count: 0, valueInGP: 1 },
    { name: "Platinum Piece", token: "pp", count: 0, valueInGP: 10 }
  ],
  traits: [
    { name: "Passive Perception", baseValue: 0, bonusValue: 0 },
    { name: "Armor Class", baseValue: 0, bonusValue: 0 },
    { name: "Proficiency Bonus", baseValue: 0, bonusValue: 0 },
    { name: "Initiative", baseValue: 0, bonusValue: 0 },
    { name: "Speed", baseValue: 0, bonusValue: 0 }],

  stats: [
    {
      name: "Strength",
      abbreviation: "STR",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [{ name: "Athletics", baseValue: 0, isProficient: false, bonusValue: 0 }]
    },
    {
      name: "Dexterity",
      abbreviation: "DEX",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [
        { name: "Acrobatics", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Sleight Of Hand", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Stealth", baseValue: 0, isProficient: false, bonusValue: 0 }]
    },
    {
      name: "Constitution",
      abbreviation: "CON",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: []
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
        { name: "Investigation", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Nature", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Religion", baseValue: 0, isProficient: false, bonusValue: 0 }]
    },
    {
      name: "Wisdom",
      abbreviation: "WIS",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [
        { name: "Animal Handling", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Insight", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Medicine", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Perception", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Survival", baseValue: 0, isProficient: false, bonusValue: 0 }]
    },
    {
      name: "Charisma",
      abbreviation: "CHA",
      value: 0,
      modValue: 0,
      savingThrow: { baseValue: 0, isProficient: false, bonusValue: 0 },
      skills: [
        { name: "Deception", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Intimidation", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Performance", baseValue: 0, isProficient: false, bonusValue: 0 },
        { name: "Persuasion", baseValue: 0, isProficient: false, bonusValue: 0 }]
    },
  ]
};

export default function CharacterSheet() {

  const [character, setCharacter] = useState(defaultCharacter);
  const [isCoinsModalOpen, setIsCoinsModalOpen] = useState(false);

  const checkingSavingThrow = (index: number) => {
    const updatedIsProficient = !character.stats[index].savingThrow.isProficient;
    let savingThrowBonusValue = character.stats[index].savingThrow.bonusValue;

    // Update Proficiency Bonus value
    updatedIsProficient ? savingThrowBonusValue += character.traits[2].baseValue : savingThrowBonusValue -= character.traits[2].baseValue;

    const thisUpdatedStat = { isProficient: updatedIsProficient, baseValue: character.stats[index].savingThrow.baseValue, bonusValue: savingThrowBonusValue }
    const updatedStats = [...character.stats];
    updatedStats[index] = { ...updatedStats[index], savingThrow: thisUpdatedStat };

    setCharacter({ ...character, stats: updatedStats, });
  };


  const checkingSkill = (statIdx: number, skillIdx: number) => {
    const updatedIsProficient = !character.stats[statIdx].skills[skillIdx].isProficient;
    let skillBonusValue = character.stats[statIdx].skills[skillIdx].bonusValue;

    // Update Proficiency Bonus value
    updatedIsProficient ? skillBonusValue += character.traits[2].baseValue : skillBonusValue -= character.traits[2].baseValue;

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
      const updatedStats = character.stats.map(stat => {
        const updatedSkills = stat.skills.map(skill =>
          skill.isProficient ? { ...skill, bonusValue: updatedValue } : skill
        );

        const updatedSavingThrow = stat.savingThrow.isProficient
          ? { ...stat.savingThrow, bonusValue: updatedValue }
          : stat.savingThrow;

        return { ...stat, skills: updatedSkills, savingThrow: updatedSavingThrow };
      });

      setCharacter({ ...character, traits: updatedTraits, stats: updatedStats });
    } else {
      setCharacter({ ...character, traits: updatedTraits });
    }
  };

  const onStatChange = (index: number, updateValue: number) => {
    let updatedStats = character.stats;
    updatedStats[index] = { ...updatedStats[index], value: updateValue, modValue: Math.floor(((updateValue ?? 0) - 10) / 2) };

    setCharacter({ ...character, stats: updatedStats });
  };



  
  return (<>

    

    <ThemeController/>


    <div className="justify-items-center border px-1 mt-1 mx-5">
      <div className="mx-auto border mt-2">
        <div className="flex items-between justify-between gap-2">
          <BackgroundDecor />

          <div className="text-center flex-grow pt-3">
            <MedievalTitle className="mx-auto " />
            <h1 className="text-current font-bold text-3xl font-fantasy mt-[-7rem]">
              Character Sheet
            </h1>
          </div>

          <BackgroundDecor mirrored />
        </div>
      </div>


      <TopPageInfo />


      <div className="flex flex-col md:flex-row mt-5">
        {/* Left side: StatsSection */}
        <div className="flex flex-col relative w-full max-w-[400px] md:max-w-none md:w-1/3">
          <StatsSection
            stats={character.stats}
            onValueChange={onStatChange}
            onSavingThrowChange={checkingSavingThrow}
            onSkillToggle={checkingSkill}
          />
        </div>
        {/*Traits Section*/}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-3">
            {character.traits.map((trait, i) => (
              <TraitsBlock key={trait.name} onValueChange={onTraitValueChange} Index={i} TraitText={trait.name} TraitValue={trait.baseValue} />
            ))}
          </div>
          <div className="flex flex-row gap-3 ">
            <ClassFeatures />
            <Feats />
          </div>


          <div className="my-5 border rounded-2xl p-4">
            <div className="grid grid-cols-5 gap-2">
              {character.coins.map((coin) => (
                <div key={coin.token}>
                  <CoinsBorder {...coin} />
                </div>
              ))}
              <div className="col-span-5 text-center mt-2">
                <button onClick={() => setIsCoinsModalOpen(true)} className="btn btn-soft btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl h-[90%]">Edit</button>
                <CoinsModal isOpen={isCoinsModalOpen} coins={character.coins} onClose={() => setIsCoinsModalOpen(false)} />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <SpeciesTraits />
            <EquipmentTable />
          </div>
          <div>
            <TrainingAndProficiencies />
          </div>
        </div>
      </div>

      <SpellSlots />
      <WaponsAndAttacksTB />
    </div>

  </>

  );
}
