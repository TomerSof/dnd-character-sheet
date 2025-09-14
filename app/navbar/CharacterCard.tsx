import React, { useState } from "react";
import { DbCharacterRow } from "../sheet/types";
import { X } from "lucide-react";
import { supabase } from "../api/supa-client";
import { useCharacter } from "../contexts/CharacterContext";

interface CharacterCardProps {
  dbChar: DbCharacterRow;
  onDelete?: (id: string) => void;
}

export default function CharacterCard({
  dbChar,
  onDelete,
}: CharacterCardProps) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCharacter, setIsSavedCharacter } = useCharacter();

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("characters")
      .delete()
      .eq("id", dbChar.id);

    setLoading(false);
    if (!error) {
      if (onDelete) onDelete(dbChar.id);
      setIsAlertOpen(false);
    } else {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      {isAlertOpen && (
        <div
          role="alert"
          className="z-1 absolute flex flex-col justify-self-center alert bg-warning/90 text-warning-content"
        >
          <p className="my-2 text-lg font-bold">
            Are you sure you want to delete this character?
          </p>
          <div className="flex flex-row justify-around w-full mb-2">
            <button
              className="btn btn-success"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>{" "}
            <button
              className="btn btn-error"
              onClick={() => setIsAlertOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="card p-2">
        <div
          className="relative w-full h-full bg-primary-content/80 text-primary shadow-sm border border-secondary rounded-xl cursor-pointer 
                  transition-transform duration-300 hover:scale-105"
          onClick={() => {
            setCharacter(dbChar.character);
            setIsSavedCharacter(true);
          }}
        >
          <div className="card-body">
            <X
              className="absolute top-2 right-2 size-8 stroke-error hover:stroke-error-content cursor-pointer"
              onClick={() => setIsAlertOpen(true)}
            />
            <h2 className="text-2xl font-bold my-3  underline underline-offset-3 decoration-wavy">
              {dbChar.character.name}
            </h2>
            <p className="text-md">Species: {dbChar.character.species}</p>
            <p className="text-md">Class: {dbChar.character.classType}</p>
            <p className="text-md">Sub Class: {dbChar.character.subclass}</p>
            <p className="text-md">Level: {dbChar.character.level}</p>
          </div>
        </div>
      </div>
    </>
  );
}
