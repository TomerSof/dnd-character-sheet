import React, { useState } from 'react'

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

    setRows([...rows, {
      id: rowsNum,
      name: "",
      attackBonus: "",
      damage: "",
      damageType: "",
      note: ""
    }]);
    plusRow(prev => prev + 1);
  }

  const removeRow = (id: number) => {
    setRows(prev => prev.filter(row => row.id != id));
  }

  return (
    <>
      <div className="overflow-x-auto border-2 scale-60 max-h-[300px]">
        <table className="table table-xs table-pin-rows table-pin-cols ">
          <thead>
            <tr>
              <th></th>
              <th className='text-center text-2xl'>Name</th>
              <th className='text-center text-2xl'>Attack Bonus / DC</th>
              <th className='text-center text-2xl'>Damage</th>
              <th className='text-center text-2xl'>Damage type</th>
              <th className='text-center text-2xl'>Note</th>
              <th ></th>
            </tr>
          </thead>
          <tbody>
            <tr key={0}>
              <td></td>
              <td><input className="input input-xs text-lg w-full text-center" /></td>
              <td><input className="input input-xs text-lg w-full text-center" /></td>
              <td><input className="input input-xs text-lg w-full text-center" /></td>
              <td><input className="input input-xs text-lg w-full text-center" /></td>
              <td><input className="input input-xs text-lg w-full text-center" /></td>
              <td></td>
            </tr>

            {rows.map(row => (
              <tr key={row.id}>
                <td></td>
                <td><input className="input input-xs text-lg w-full text-center" /></td>
                <td><input className="input input-xs text-lg w-full text-center" /></td>
                <td><input className="input input-xs text-lg w-full text-center" /></td>
                <td><input className="input input-xs text-lg w-full text-center" /></td>
                <td><input className="input input-xs text-lg w-full text-center" /></td>

                <td><button
                  onClick={() => removeRow(row.id)}
                  className=" btn btn-xs  btn-error bg-red-800 rounded-xl text-white"
                >
                  ✕
                </button></td>
                <td></td>
              </tr>
            ))}


          </tbody>
          <tfoot>
            <tr className='group hover:border hover:border-yellow-300'>
              <td colSpan={7} className="text-center">
                <svg
                  className=" inline-block w-full h-9 opacity-60 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
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
              <td></td>
            </tr>
          </tfoot>
        </table>

      </div>


    </>

  )
}
