import React, { useState } from "react";
import BorderDecorSVG from "../svg/BorderDecorSVG";
import { CirclePlus } from "lucide-react";

type Row = {
  id: number;
  name: string;
  attackBonus: string;
  damage: string;
  damageType: string;
  note: string;
};

export default function WeaponsAndAttacksTB() {
  const [rows, setRows] = useState<Row[]>([]);
  const [rowsNum, plusRow] = useState(1);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rowsNum,
        name: "",
        attackBonus: "",
        damage: "",
        damageType: "",
        note: "",
      },
    ]);
    plusRow((prev) => prev + 1);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id != id));
  };

  return (
    <>
      <div className="overflow-x-auto border-2 outline outline-offset-2 outline-primary/80 border-primary bg-primary/20 rounded my-5 ">
        <div className="flex flex-row justify-between ">
          <BorderDecorSVG chosenFill="fill-primary" chosenStroke="stroke-transparent"/>
          <h3 className="text-center font-fantasy text-3xl font-bold text-secondary my-5 pb-5 underline">
            {" "}
            Weapons & Attacks
          </h3>
          <BorderDecorSVG mirrored chosenFill="fill-primary" chosenStroke="stroke-transparent"/>
        </div>
        <div className="overflow-y-auto max-h-[350px]">
          <table className="table table-xs table-pin-rows bg-transparent table-pin-cols w-full">
            <thead >
              
            </thead>
            <tbody>
              <tr key={-1} className="bg-transparent">
                <th className="bg-transparent"></th>
                <th className="text-center font-fantasy font-extrabold text-secondary text-outline-base-content text-2xl bg-transparent">
                  Name
                </th>
                <th className="text-center font-fantasy font-extrabold text-secondary text-outline-base-content text-2xl bg-transparent">
                  Attack Bonus / DC
                </th>
                <th className="text-center font-fantasy font-extrabold text-secondary text-outline-base-content text-2xl bg-transparent">
                  Damage
                </th>
                <th className="text-center font-fantasy font-extrabold text-secondary text-outline-base-content text-2xl bg-transparent">
                  Damage type
                </th>
                <th className="text-center font-fantasy font-extrabold text-secondary text-outline-base-content text-2xl bg-transparent">
                  Note
                </th>
                <th className="bg-transparent"></th>
              </tr>
              <tr key={0}>
                <td ></td>
                <td>
                  <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                </td>
                <td>
                  <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                </td>
                <td>
                  <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                </td>
                <td>
                  <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                </td>
                <td>
                  <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                </td>
                <td></td>
              </tr>

              {rows.map((row) => (
                <tr key={row.id}>
                  <td></td>
                  <td>
                    <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                  </td>
                  <td>
                    <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                  </td>
                  <td>
                    <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                  </td>
                  <td>
                    <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                  </td>
                  <td>
                    <input className="input input-sm text-lg w-full text-center border-primary focus:outline-secondary" />
                  </td>

                  <td>
                    <button
                      onClick={() => removeRow(row.id)}
                      className=" btn btn-xs  btn-error bg-red-800 rounded-xl text-white"
                    >
                      ✕
                    </button>
                  </td>
                  <td></td>
                </tr>
              ))}
              <tr className="group  bg-transparent">
                <td colSpan={7} className="text-center">
                  <CirclePlus
                className="text-secondary-content justify-self-center size-8 fill-success-content hover:fill-success transition-fill duration-500 cursor-pointer"
                onClick={addRow}
              />
                </td>
                <td></td>
              </tr>
            </tbody>
            <tfoot>
              
            </tfoot>
          </table>
        </div>
        <div className="flex justify-between">
          <BorderDecorSVG flipped chosenFill="fill-primary" chosenStroke="stroke-transparent"/>
          <BorderDecorSVG flipped mirrored chosenFill="fill-primary" chosenStroke="stroke-transparent"/>
        </div>
      </div>
    </>
  );
}
