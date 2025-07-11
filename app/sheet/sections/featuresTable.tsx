import React, { useState } from 'react';

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
  namePlaceholder = '',
  descPlaceholder = '',
}: FeaturesTableProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [rowsNum, plusRow] = useState(1);

  const addRow = () => {
    setRows([...rows, { id: rowsNum, name: '', description: '' }]);
    plusRow((prev) => prev + 1);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="overflow-x-auto max-h-[500px]">
      <h2 className="text-2xl font-bold mb-5 text-center text-secondary underline">{title}</h2>
      <table className="table border-2  table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr className=''>
            <th className='bg-secondary/60'></th>
            <td className="text-center text-neutral-900 text-xl bg-secondary/60 underline">{nameLabel}</td>
            <td className="text-center text-neutral-900 text-xl bg-secondary/60 underline">{descLabel}</td>
            <th className='bg-secondary/60'></th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-secondary/20'>
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
            <td>
              <button
                onClick={() => {}}
                className="btn btn-xs btn-error bg-red-800 rounded-xl text-white invisible"
              >
                ✕
              </button>
            </td>
          </tr>

          {rows.map((row) => (
            <tr key={row.id} className='bg-secondary/20'>
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
          <tr className="bg-secondary/60 group hover:border hover:border-yellow-300">
            <td colSpan={7} className="text-center">
              <svg
                className="pr-10 inline-block w-full h-7 opacity-60 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                viewBox="0 0 48 48"
                onClick={addRow}
              >
                <circle fill="#4CAF50" cx="24" cy="24" r="21" />
                <g fill="#ffffff">
                  <rect x="21" y="14" width="6" height="20" />
                  <rect x="14" y="21" width="20" height="6" />
                </g>
              </svg>
            </td>
            
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
