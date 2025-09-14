"use client";

import React, { useCallback, useEffect, useState } from "react";
import TopPageInfo from "./sections/TopPageInfo";
import SpellSlots from "./sections/SpellSlots";
import WaponsAndAttacksTB from "./sections/WeaponsAndAttacksTB";
import ClassFeatures from "./sections/ClassFeatures";
import Feats from "./sections/Feats";
import SpeciesTraits from "./sections/SpeciesTraits";
import TrainingAndProficiencies from "./sections/TrainingAndProficiencies";
import EquipmentTable from "./sections/EquipmentTable";
import CoinsModal from "./sections/CoinsModal";
import { useCharacter } from "../contexts/CharacterContext";
import SpellCastingInfo from "./sections/SpellCastingInfo";
import AboutCharacter from "./sections/AboutCharacter";
import SearchSpellsTable from "./sections/spellsTable/SearchSpellsTable";
import BorderDecorSVG from "./svg/BorderDecorSVG";
import MedievalTitleSVG from "./svg/MedivalTitleSVG";
import StatsSection from "./sections/stats/StatsSection";
import TraitBlock from "./sections/traits/TraitBlock";
import CoinBorderSVG from "./svg/CoinBorderSVG";
import { useSession } from "../contexts/SessionContext";

interface CharacterSheetProps {
  guestMode: boolean;
}

export default function CharacterSheet({ guestMode }: CharacterSheetProps) {
  const {
    character,
    stats,
    traits,
    coins,
    appearance,
    backstory,
    isSavedCharacter,
    setIsSavedCharacter,
    setCharacter,
    checkingSavingThrow,
    checkingSkill,
    onTraitValueChange,
    onStatChange,
    updateCoins,
  } = useCharacter();

  const [isCoinsModalOpen, setIsCoinsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { session } = useSession();

  const handleSaveCharacter = useCallback(async () => {
    if (!session) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: session.user.id, character }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      console.log(data.message);
      setIsSavedCharacter(true);
    } catch (err) {
      if (err instanceof Error) console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  }, [session, character, setIsSavedCharacter]);

  // Autosave interval
  useEffect(() => {
    if (!isSavedCharacter) return; // only auto-save if character already exists

    const interval = setInterval(() => {
      handleSaveCharacter();
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, [isSavedCharacter, handleSaveCharacter]);

  return (
    <>
      {!guestMode && (
        <button
          className="btn btn-secondary bottom-3 right-7 shadow-lg z-2 fixed"
          onClick={handleSaveCharacter}
        >
          {isSaving ? "Saving..." : "Save Character"}
        </button>
      )}
      <div className="justify-items-center border-2 border-primary px-1 mt-2 mx-5">
        <div className="mx-auto border-2 border-primary mt-2">
          <div className="flex items-between justify-between gap-2">
            <BorderDecorSVG />

            <div className="text-center flex-grow pt-3">
              <MedievalTitleSVG className="mx-auto " />
              <h1 className="text-base-content text-outline-secondary font-bold text-3xl font-fantasy mt-[-7rem]">
                Character Sheet
              </h1>
            </div>

            <BorderDecorSVG mirrored />
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
                <TraitBlock
                  key={trait.name}
                  onValueChange={onTraitValueChange}
                  Index={i}
                  TraitText={trait.name}
                  TraitValue={trait.baseValue}
                />
              ))}
            </div>

            <AboutCharacter
              backstory={backstory}
              appearance={appearance}
              setCharacter={setCharacter}
            />

            <div className="flex flex-row justify-around gap-4 mx-2">
              <ClassFeatures />
              <EquipmentTable />
            </div>

            <div className="my-5 border-2 outline outline-offset-2 outline-primary/80 border-primary rounded-2xl p-4 mx-2">
              <div className="grid grid-cols-5 gap-2 text-primary">
                {coins.map((coin) => (
                  <div className="relative" key={coin.token}>
                    <p className="text-secondary/70 font-bold underline absolute top-[0%] left-[20%] transform -translate-x-1/2 text-lg text-shadow-neutral/30 text-shadow-lg">
                      {coin.token}
                    </p>
                    <CoinBorderSVG />
                    <p className="absolute bottom-[38%] left-[50%] transform -translate-x-1/2 text-secondary text-2xl text-shadow-neutral/55 text-shadow-lg">
                      {coin.count}
                    </p>
                  </div>
                ))}
                <div className="col-span-5 text-center mt-2">
                  <button
                    onClick={() => setIsCoinsModalOpen(true)}
                    className="btn btn-soft btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl h-[90%]"
                  >
                    Edit
                  </button>
                  <CoinsModal
                    isOpen={isCoinsModalOpen}
                    coins={coins}
                    onSubmit={updateCoins}
                    onClose={() => setIsCoinsModalOpen(false)}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-3">
              <SpeciesTraits />
              <Feats />
            </div>
          </div>
        </div>
        <div className="py-5">
          <WaponsAndAttacksTB />
        </div>
        <div className="w-full px-15">
          <TrainingAndProficiencies />
        </div>

        <div className="grid grid-cols-5 gap-1 my-2 mx-2 rounded-lg  ">
          <div className="col-span-2 flex items-center justify-center h-full">
            <SpellCastingInfo />
          </div>
          <div className="col-span-3 flex items-center py-2 px-2 justify-center">
            <SpellSlots />
          </div>
        </div>
        <SearchSpellsTable />
      </div>
    </>
  );
}
