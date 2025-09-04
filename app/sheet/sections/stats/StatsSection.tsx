"use client";
import React from "react";
import StatBlock from "./StatBlock";
import { Stat } from "../../types";
import FloatingNumInput from "@/app/components/FloatingNumInput";

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
  onSkillToggle,
}: Props) {
  return (
    <div className="flex flex-col justify-items-start gap-4 w-full max-w-[500px]">
      {stats.map((stat, statIdx) => (
        <div
          key={stat.name}
          className="grid bg-primary border rounded-tr-4xl rounded-bl-4xl grid-cols-2 md:grid-cols-2  mr-10 "
        >
          {/* Stat Block */}
          <div className="col-span-1 my-1">
            <div className="flex flex-col items-center">
              <StatBlock
                key={stat.name}
                onStatChange={onValueChange}
                statIdx={statIdx}
                modifierValue={stat.modValue}
                statValue={stat.value}
                statText={stat.name}
              />
              <div className="flex flex-row items-center max-w-3/4 justify-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={stat.savingThrow.isProficient}
                  onChange={() => onSavingThrowChange(statIdx)}
                  className="checkbox-theme"
                />
                
                <FloatingNumInput
                  title="Saving Throw"
                  placeholder="Saving Throw"
                  value={
                    stat.savingThrow.baseValue + stat.savingThrow.bonusValue
                  }
                  readonly
                  spanClass="text-secondary whitespace-nowrap overflow-hidden text-ellipsis text-start "
                  className="input input-xs text-lg w-full max-w-7/8 text-center"
                />
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
                        className="checkbox-theme"
                      />
                    </th>
                    <td className="border-b border-neutral font-bold text-primary-content">{skill.name}</td>
                    <td className="border-b border-neutral rounded font-bold text-primary-content">
                      {skill.baseValue + skill.bonusValue}
                    </td>
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
