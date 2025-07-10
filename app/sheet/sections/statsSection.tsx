'use client';
import React from "react";
import StatBlock from "../borders/statBlock";

type Skill = {
  name: string;
  baseValue: number;
  isProficient: boolean;
  bonusValue: number;
};

type SavingThrow = {
  baseValue: number;
  isProficient: boolean;
  bonusValue: number;
};

type Stat = {
  name: string;
  abbreviation: string;
  savingThrow: SavingThrow;
  skills: Skill[];
  value: number;
  modValue: number;
};


type Props = {
  stats: Stat[];
  onSavingThrowChange: (statIdx: number) => void; // Setting proficiency on saving throw
  onSkillToggle: (statIdx: number, skillIdx: number) => void; //Setting proficiency on a skill
  onValueChange: (statIdx: number, updateValue: number) => void; //Updating stat value
};


export default function StatsSection({
  stats,
  onValueChange,
  onSavingThrowChange,
  onSkillToggle
}: Props) {
  return (
    <div className="flex flex-col justify-items-start gap-4 w-full max-w-[500px]">
      {stats.map((stat, statIdx) => (
        <div key={stat.name} className="grid bg-secondary/20 border rounded-tr-4xl rounded-bl-4xl grid-cols-2 md:grid-cols-2  mr-10 ">
          {/* Stat Block */}
          <div className="col-span-1 my-1">
            <div className="flex flex-col items-center">
              <StatBlock key={stat.name} onStatChange={onValueChange} statIdx={statIdx} modifierValue={stat.modValue} statValue={stat.value} statText={stat.name} />
              <div className="flex flex-row items-center max-w-3/4 justify-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={stat.savingThrow.isProficient}
                  onChange={() => onSavingThrowChange(statIdx)}
                  className="checkbox border-base-300 bg-neutral-500  checked:border-current checked:bg-secondary checked:text-current"
                />
                <label className="form-control floating-label w-full max-w-xs">
                  <span className="label-text text-xs">Saving Throw</span>
                  <input
                    type="number"
                    placeholder="Saving Throw"
                    value={stat.savingThrow.baseValue + stat.savingThrow.bonusValue}
                    readOnly
                    className="input input-xs text-lg w-full max-w-7/8 text-center"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="col-span-1 overflow-x-auto justify-items-center">
            <table className="table table-xs border-l border-collapse h-full w-full">
              <tbody>
                {stat.skills.map((skill, skillIdx) => (
                  <tr key={skill.name} className=" border-l">
                    <th className="border-b">
                      <input
                        type="checkbox"
                        checked={skill.isProficient}
                        onChange={() => onSkillToggle(statIdx, skillIdx)}
                        className="checkbox border-base-300 bg-neutral-500  checked:border-current checked:bg-secondary checked:text-current"
                      />
                    </th>
                    <td className="border-b">{skill.name}</td>
                    <td className="border-b rounded">{skill.baseValue + skill.bonusValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
