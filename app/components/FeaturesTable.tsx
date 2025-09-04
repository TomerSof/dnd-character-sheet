import { CirclePlus } from "lucide-react";
import React, { useState } from "react";

type Row = {
  id: number;
  name: string;
  description: string;
};

type FeaturesTableProps = {
  title: string;
  nameLabel: string;
  descLabel: string;
  namePlaceholder?: string;
  descPlaceholder?: string;
};

export default function FeaturesTable({
  title,
  nameLabel,
  descLabel,
  namePlaceholder = "",
  descPlaceholder = "",
}: FeaturesTableProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [rowsNum, plusRow] = useState(1);

  const addRow = () => {
    setRows([...rows, { id: rowsNum, name: "", description: "" }]);
    plusRow((prev) => prev + 1);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="overflow-x-auto w-[90%] max-h-[500px]">
      <h2 className="text-3xl font-fantasy text-outline-secondary-content font-bold mb-5 text-center text-secondary underline">
        {title}
      </h2>
      <table className="table border-2 bg-primary/60 table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr className="font-fantasy font-bold ">
            <th className="bg-primary"></th>
            <td className="text-center text-primary-content text-2xl bg-primary underline">
              {nameLabel}
            </td>
            <td className="text-center text-primary-content text-2xl bg-primary underline">
              {descLabel}
            </td>
            <th className="bg-primary"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td className=" w-[40%]">
              <input
                className="input input-sm text-bold w-full text-center"
                placeholder={namePlaceholder}
              />
            </td>
            <td className="w-[65%]">
              <textarea
                className="textarea textarea-sm text-bold w-full"
                placeholder={descPlaceholder}
              />
            </td>
          </tr>

          {rows.map((row) => (
            <tr key={row.id} >
              <td></td>
              <td className="pt-5 w-[40%]">
                <input
                  className="input input-sm w-full text-bold text-center"
                  placeholder={namePlaceholder}
                />
              </td>
              <td className="w-[65%]">
                <textarea
                  className="textarea textarea-sm text-bold w-full"
                  placeholder={descPlaceholder}
                />
              </td>
              <td>
                <button
                  onClick={() => removeRow(row.id)}
                  className="btn btn-xs btn-error bg-red-800 rounded-xl text-white"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-primary">
            <td colSpan={7} className="text-center">
              <CirclePlus
                className="text-secondary-content justify-self-center size-8 fill-success-content hover:fill-success transition-fill duration-500 cursor-pointer"
                onClick={addRow}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
