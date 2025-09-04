import {
  SpellCost,
  SpellLevel,
  SpellSearchParams,
} from "@/app/sheet/types";
import FloatingNumInput from "@/app/components/FloatingNumInput";
import FloatingTxtInput from "@/app/components/FloatingTxtInput";
import React, { useState } from "react";
import { useSpellTableContext } from "@/app/contexts/SpellTableContext";

type Props = {
  setSearchParameters: (
    value:
      | SpellSearchParams
      | undefined
      | ((prev: SpellSearchParams | undefined) => SpellSearchParams | undefined)
  ) => void;
};

export default function SearchBar() {
  const [inputKey, setInputKey] = useState(0);
  const {searchParameters,setSearchParameters} = useSpellTableContext();

  const handleClear = () => {
    setSearchParameters(undefined);
    setInputKey((k) => k + 1);
  };
  return (
    <div className="flex flex-row w-full justify-around bg-primary/60 py-2 mt-5 mb-2 text-primary-content rounded">
      <p className="self-center font-fantasy  text-secondary text-outline-secondary-content underline text-3xl font-extrabold">
        Search:
      </p>
      <fieldset className="fieldset flex justify-center ">
        <legend className="fieldset-legend text-lg font-fantasy font-bold text-primary text-outline-primary-content underline">
          Search by level
        </legend>
        <FloatingNumInput
          key={inputKey}
          title="Level"
          placeholder="*"
          positive
          className="w-[6ch] bg-secondary text-center font-bold text-lg"
          onChange={(val) =>
            setSearchParameters({
              ...searchParameters,
              level: val as SpellLevel,
            })
          }
        />
      </fieldset>
      <fieldset className="fieldset flex justify-center ">
        <legend className="fieldset-legend text-center text-lg font-fantasy font-bold text-primary text-outline-primary-content underline">
          Search by name
        </legend>
        <FloatingTxtInput
          key={inputKey}
          title="Name"
          placeholder="Enter spell name"
          className="bg-secondary text-center font-bold text-lg"
          onChange={(val) =>
            setSearchParameters({ ...searchParameters, name: val })
          }
        />
      </fieldset>
      <fieldset className="fieldset flex justify-center ">
        <legend className="fieldset-legend text-lg font-fantasy font-bold text-primary text-outline-primary-content underline">
          Search by cost
        </legend>
        <select
          className="select bg-secondary text-center font-bold rounded"
          key={inputKey}
          onChange={(e) =>
            setSearchParameters({
              ...searchParameters,
              cost: e.target.value as SpellCost,
            })
          }
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Bonus Action">Bonus Action</option>
          <option value="Reaction">Reaction</option>
          <option value="Free">Free</option>
        </select>
      </fieldset>
      <fieldset className="fieldset flex justify-center">
        <legend className="fieldset-legend text-lg font-fantasy font-bold text-primary text-outline-primary-content underline">
          Concentration
        </legend>
        <input
          key={inputKey}
          type="checkbox"
          className="checkbox checkbox-secondary bg-secondary text-center font-bold text-lg"
          onChange={(e) =>
            setSearchParameters({
              ...searchParameters,
              concentration: e.target.checked,
            })
          }
        />
      </fieldset>
      <fieldset className="fieldset flex justify-center">
        <legend className="fieldset-legend text-lg font-fantasy font-bold text-primary text-outline-primary-content underline">
          Ritual
        </legend>
        <input
          key={inputKey}
          type="checkbox"
          className="checkbox checkbox-secondary bg-secondary text-center font-bold text-lg"
          onChange={(e) =>
            setSearchParameters({
              ...searchParameters,
              ritual: e.target.checked,
            })
          }
        />
      </fieldset>
      <button className="btn self-center" onClick={handleClear}>
        Clear Search Parameters
      </button>{" "}
    </div>
  );
}
