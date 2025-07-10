// components/CoinsModal.tsx
'use client';

import React from 'react';

type CoinsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  coins: {
    name: string;
    token: string;
    count: number;
    valueInGP: number;
  }[];
};
export default function CoinsModal({ isOpen, onClose }: CoinsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal modal-open"
      role="dialog"
      onClick={onClose} // closes when clicking outside box
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} // prevents close when clicking inside
      >
        <h3 className="font-bold text-accent text-lg">Edit Coins</h3>
        <p className="py-4">Coin editing UI here</p>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}