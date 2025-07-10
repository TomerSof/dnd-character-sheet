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
import { useCharacter } from "./characterContext";



export default function CharacterSheet() {

  const {
    stats,
    traits,
    coins,
    checkingSavingThrow,
    checkingSkill,
    onTraitValueChange,
    onStatChange,
  } = useCharacter();
  const [isCoinsModalOpen, setIsCoinsModalOpen] = useState(false);

  



  
  return (<>

    <PracticeComponent/>

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
            stats={stats}
            onValueChange={onStatChange}
            onSavingThrowChange={checkingSavingThrow}
            onSkillToggle={checkingSkill}
          />
        </div>
        {/*Traits Section*/}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-3">
            {traits.map((trait, i) => (
              <TraitsBlock key={trait.name} onValueChange={onTraitValueChange} Index={i} TraitText={trait.name} TraitValue={trait.baseValue} />
            ))}
          </div>
          <div className="flex flex-row gap-3 ">
            <ClassFeatures />
            <Feats />
          </div>


          <div className="my-5 border rounded-2xl p-4">
            <div className="grid grid-cols-5 gap-2">
              {coins.map((coin) => (
                <div key={coin.token}>
                  <CoinsBorder {...coin} />
                </div>
              ))}
              <div className="col-span-5 text-center mt-2">
                <button onClick={() => setIsCoinsModalOpen(true)} className="btn btn-soft btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl h-[90%]">Edit</button>
                <CoinsModal isOpen={isCoinsModalOpen} coins={coins} onClose={() => setIsCoinsModalOpen(false)} />
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
