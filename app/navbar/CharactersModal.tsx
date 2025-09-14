import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "../contexts/SessionContext";
import { supabase } from "../api/supa-client";
import { DbCharacterRow } from "../sheet/types";
import CharacterCard from "./CharacterCard";

interface CharactersModalProps {
  handleOnClose: () => void;
}

export default function CharactersModal({
  handleOnClose,
}: CharactersModalProps) {
  const { session } = useSession();
  const [dbCharacters, setDbCharacters] = useState<DbCharacterRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleOnClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleOnClose]);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!session?.user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("characters")
        .select("*")
        .eq("user_id", session.user.id)
        .returns<DbCharacterRow[]>();

      if (!error && data) {
        setDbCharacters(data);
      }
      setLoading(false);
      console.log("Fetched characters:", data);
    };

    fetchCharacters();
  }, [session]);

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
