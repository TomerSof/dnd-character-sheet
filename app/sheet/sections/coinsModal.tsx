// components/CoinsModal.tsx
'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';

type CoinsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  coins: {
    name: string;
    token: string;
    count: number;
    valueInGP: number;
  }[];
  onSubmit: (add: Record<string, number>, subtract: Record<string, number>) => void;
};
export default function CoinsModal({ isOpen, onClose, coins, onSubmit }: CoinsModalProps) {
  if (!isOpen) return null;

  const [addValues, setAddValues] = useState<Record<string, number>>({});
  const [subtractValues, setSubtractValues] = useState<Record<string, number>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: "add" | "subtract", token: string) => {
    const value = Math.max(0, e.target.valueAsNumber);
    if (type == "add")
      setAddValues(prev => ({ ...prev, [token]: value }));
    else {
      const coin = coins.find(c => c.token === token);
      const maxSubtract = coin ? coin.count : 0;
      setSubtractValues(prev => ({
        ...prev,
        [token]: value > maxSubtract ? maxSubtract : value
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(addValues, subtractValues);
    onClose();
  };

  return (
    <div
      className="modal modal-open"
      role="dialog"
      onClick={onClose} // closes when clicking outside box
    >
      <div
        className="modal-box bg-primary/90 border-2   border-secondary max-w-[75%] w-[65%]"
        onClick={(e) => e.stopPropagation()} // prevents close when clicking inside
      >
        <h3 className="font-bold text-primary-content font-fantasy text-outline-secondary text-2xl underline">Edit Coins</h3>

        <form onSubmit={handleSubmit} className='w-full my-5'>

          <div className="flex flex-row items-center ring-2 ring-success ring-inset bg-secondary-content/60 gap-4 py-2 mb-5 rounded">
            <p className="text-success font-fantasy font-bold text-outline-primary-content text-center w-1/6 text-xl self-center">Add:</p>
            <div className="flex gap-4 w-5/6 mx-2">
              {coins.map(coin => (
                <label key={coin.name} className="floating-label">
                  <span>{coin.token}</span>
                  <input type="number" value={addValues[coin.token] || 0} onChange={(e => handleChange(e, "add", coin.token))}
                    placeholder={coin.token} className="input input-md" />
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-row items-center ring-2 ring-error ring-inset bg-secondary-content/60 gap-4 py-2 mb-5 rounded">
            <p className="text-error font-fantasy font-bold text-outline-primary-content text-center w-1/6  text-xl self-center">Subtract:</p>
            <div className="flex gap-4 w-5/6 mx-2">
              {coins.map(coin => (
                <label key={coin.name} className="floating-label">
                  <span>{coin.token}</span>
                  <input type="number" value={subtractValues[coin.token] || 0} onChange={(e => handleChange(e, "subtract", coin.token))}
                    placeholder={coin.token} className="input input-md" />
                </label>
              ))}
            </div>
          </div>

          <div className="modal-action flex gap-15 justify-center">
            <button className="btn btn-soft btn-error" type='button' onClick={onClose}>Cancel</button>
            <button className='btn btn-soft btn-success' type='submit'>Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
}