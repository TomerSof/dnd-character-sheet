import React, { useEffect } from "react";
import { useSession } from "../contexts/SessionContext";
import { supabase } from "../api/supa-client";
import CharacterCard from "./CharacterCard";
import { DbCharacterRow } from "../sheet/types";

interface CharactersModalProps {
  handleOnClose: () => void;
}

export default function CharactersModal({
  handleOnClose,
}: CharactersModalProps) {
  const { session, dbCharacters, setDbCharacters } = useSession();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleOnClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleOnClose]);

  useEffect(() => {
    if (!session?.user || dbCharacters.length > 0) return;

    const fetchCharacters = async () => {
      const { data, error } = await supabase
        .from("characters")
        .select("*")
        .eq("user_id", session.user.id)
        .returns<DbCharacterRow[]>();

      if (!error && data) {
        setDbCharacters(data);
      }
      console.log("Fetched characters:", data);
    };

    fetchCharacters();
  }, [session, dbCharacters.length, setDbCharacters]);

  return (
    <>
      <div className="modal inset-0 z-10 modal-open modal-bottom sm:modal-middle">
        <div className="modal-box flex align-center flex-col bg-primary/80">
          <h3 className="font-bold text-3xl underline font-fantasy text-outline-secondary text-center">
            My Characters
          </h3>
          {dbCharacters.length != 0 ? (
            <div className="grid grid-cols-3 gap-1 my-3">
              {dbCharacters.map((dbChar) => (
                <CharacterCard
                  dbChar={dbChar}
                  key={dbChar.id}
                  onDelete={(id) =>
                    setDbCharacters((prev) => prev.filter((c) => c.id !== id))
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-center my-5 text-lg">
              No characters found. Create one!
            </p>
          )}
          <button className="btn btn-error" onClick={handleOnClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}
