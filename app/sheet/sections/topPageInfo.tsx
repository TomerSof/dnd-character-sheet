import FloatingNumInput from "@/app/components/FloatingNumInput";
import FloatingTxtInput from "@/app/components/FloatingTxtInput";
import { useCharacter } from "@/app/contexts/CharacterContext";
import React, { useState } from "react";

export default function TopPageInfo() {
  const [checkedFails, setCheckedFails] = useState([false, false, false]);
  const [checkedSuccess, setCheckedSuccess] = useState([false, false, false]);

  const {
    name,
    setCharacter,
    species,
    classType,
    subclass,
    background,
    level,
    xp,
    maxHP,
    currentHP,
    tmpHP,
    hitDiceMax,
    hitDiceSpent,
  } = useCharacter();

  function toggleFail(index: number) {
    setCheckedFails((prev) => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  }

  function toggleSuccess(index: number) {
    setCheckedSuccess((prev) => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  }

  return (
    <div className="grid border bg-primary rounded-b-2xl w-full grid-cols-5">
      {/*Left Side*/}
      <div className="w-full h-full border-r col-span-2 self-center pl-5">
        <div className="grid grid-cols-2 gap-4 p-2 ">
          <FloatingTxtInput
            title="Character Name"
            placeholder="Character Name"
            value={name}
            onChange={(val) => setCharacter((prev) => ({ ...prev, name: val }))}
            labelClass="col-span-2"
            className="w-full font-semibold"
            spanClass="font-bold text-secondary"
          />

          <FloatingTxtInput
            title="Background"
            placeholder="Background"
            labelClass="col-span-1"
            spanClass="font-bold text-secondary"
            className="w-full font-semibold"
            value={background}
            onChange={(val) =>
              setCharacter((prev) => ({ ...prev, background: val }))
            }
          />

          <FloatingTxtInput
            title="Class"
            placeholder="Class"
            labelClass="col-span-1"
            spanClass="font-bold text-secondary"
            className="w-full font-semibold"
            value={classType}
            onChange={(val) =>
              setCharacter((prev) => ({ ...prev, classType: val }))
            }
          />

          <FloatingTxtInput
            title="Species"
            placeholder="Species"
            labelClass="col-span-1"
            spanClass="font-bold text-secondary"
            className="w-full font-semibold"
            value={species}
            onChange={(val) =>
              setCharacter((prev) => ({ ...prev, species: val }))
            }
          />

          <FloatingTxtInput
            title="Sub Class"
            placeholder="Sub Class"
            labelClass="col-span-1"
            spanClass="font-bold text-secondary"
            className="w-full font-semibold"
            value={subclass}
            onChange={(val) =>
              setCharacter((prev) => ({ ...prev, subclass: val }))
            }
          />
        </div>
      </div>

      {/*Middle*/}
      <div className="w-full h-full border-l border-r col-span-1 self-center ">
        <div className="flex flex-col justify-center items-center p-2 h-full mx-2 gap-4 ">
          <FloatingNumInput
            title="Level"
            placeholder="Level"
            value={level}
            className="w-[7ch] text-center font-bold"
            positive
            spanClass="font-bold text-secondary"
            onChange={(val) =>
              setCharacter((prev) => ({ ...prev, level: val }))
            }
          />
          <FloatingNumInput
            title="XP"
            placeholder="XP"
            value={xp}
            className="w-[7ch] text-center font-bold"
            positive
            spanClass="font-bold text-secondary"
            onChange={(val) => setCharacter((prev) => ({ ...prev, xp: val }))}
          />
        </div>
      </div>

      {/*Right Side*/}
      <div className="w-full  col-span-2 self-center">
        <div className="grid grid-cols-3 border-l text-center justify-items-center ">
          <div className="col-span-1 p-1 ">
            <div className="flex flex-col gap-2">
              <h3 className="text-primary-content font-bold text-outline-base-content font-fantasy underline">Hit Points</h3>
              <FloatingNumInput
                title="Current"
                placeholder="Current"
                value={currentHP}
                className="w-[7ch] text-center font-bold"
                positive
                spanClass="font-bold text-secondary"
                onChange={(val) =>
                  setCharacter((prev) => ({ ...prev, currentHP: val }))
                }
              />
              <FloatingNumInput
                title="Temp"
                placeholder="Temp"
                value={tmpHP}
                className="w-[7ch] text-center font-bold"
                positive
                spanClass="font-bold text-secondary"
                onChange={(val) =>
                  setCharacter((prev) => ({ ...prev, tmpHP: val }))
                }
              />
              <FloatingNumInput
                title="Max"
                placeholder="Max"
                value={maxHP}
                className="w-[7ch] text-center font-bold"
                positive
                spanClass="font-bold text-secondary"
                onChange={(val) =>
                  setCharacter((prev) => ({ ...prev, maxHP: val }))
                }
              />
            </div>
          </div>

          <div className="col-span-1 w-full flex flex-col p-2">
            <h3 className="text-primary-content font-bold text-outline-base-content font-fantasy underline">Hit Dice</h3>
            <div className="flex flex-col justify-center gap-3 flex-grow w-fit mx-auto">
              <FloatingNumInput
                title="Spent"
                placeholder="Spent"
                value={hitDiceSpent}
                className="w-[7ch] text-center font-bold"
                positive
                spanClass="font-bold text-secondary"
                onChange={(val) =>
                  setCharacter((prev) => ({ ...prev, hitDiceSpent: val }))
                }
              />
              <FloatingNumInput
                title="Max"
                placeholder="Max"
                value={hitDiceMax}
                className="w-[7ch] text-center font-bold"
                spanClass="font-bold text-secondary"
                positive
                onChange={(val) =>
                  setCharacter((prev) => ({ ...prev, hitDiceMax: val }))
                }
              />
            </div>
          </div>

          <div className="rounded-br-2xl p-2 col-span-1 flex flex-col w-full">
            <h3 className="text-primary-content font-bold text-outline-base-content font-fantasy underline">Death Saves</h3>

            {/*Fails*/}
            <div className="flex flex-col justify-center gap-6 flex-grow w-fit mx-auto">
              <div>
                <label className="label text-outline-base-content font-fantasy text-md text-error font-extrabold underline underline-offset-2">
                  Fails
                </label>
                <br />
                {checkedFails.map((checked, i) => (
                  <input
                    key={i}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFail(i)}
                    className="mx-1 checkbox border-primary border-2 bg-secondary-content checked:border-error checked:bg-red-400 checked:text-red-800"
                  />
                ))}
              </div>
              {/*Save*/}
              <div>
                <label className="label text-outline-base-content font-fantasy text-md text-success font-extrabold underline underline-offset-2">
                  Success
                </label>
                <br />
                {checkedSuccess.map((checked, i) => (
                  <input
                    key={i}
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSuccess(i)}
                    className="mx-1 checkbox border-primary border-2 bg-secondary-content checked:border-success checked:bg-green-400 checked:text-green-800"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
