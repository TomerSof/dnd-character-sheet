"use client";
import React, { ChangeEvent, useContext, useState } from "react";

export default function page() {
  const [val, setVal] = useState("");

  const handleValChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className="input"
        onChange={handleValChange}
        value={val}
      />
    </div>
  );
}
