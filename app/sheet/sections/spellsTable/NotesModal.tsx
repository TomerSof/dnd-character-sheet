// components/NotesModal.tsx
import React from "react";
import { Pencil } from "lucide-react";
import { useSpellTableContext } from "@/app/contexts/SpellTableContext";

type Props = {
  tSpellId: string;
};

export default function NotesModal({ tSpellId }: Props) {
  const {
    tableSpells,
    modalSpellId,
    isNotesEditable,
    setIsNotesEditable,
    setModalSpellId,
    notesDraft,
    setNotesDraft,
    updateSpellField,
    handleNoteCancel,
  } = useSpellTableContext();

  const tSpell = tableSpells.find((t) => t.spell.id === tSpellId);
  if (!tSpell || modalSpellId !== tSpellId) return null;

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box flex flex-col justify-center text-center w-full bg-primary">
        <p className="text-xl text-primary-content underline">Notes:</p>
        <div className="modal-action">
          <form
            className="w-full flex flex-col gap-5 justify-center"
            onSubmit={(e) => {
              e.preventDefault();
              updateSpellField(tSpell.spell.id, "notes", notesDraft);
              setModalSpellId(null); // close modal
            }}
          >
            <textarea
              className="textarea textarea-secondary w-full bg-primary text-primary-content disabled:bg-primary disabled:text-primary-content disabled:placeholder:!text-error "
              style={{ color: isNotesEditable ? "" : "" }}
              value={notesDraft}
              placeholder={
                isNotesEditable ? "Enter spell notes" : "Notes is Empty"
              }
              disabled={!isNotesEditable}
              onChange={(e) => setNotesDraft(e.target.value)}
            ></textarea>

            {isNotesEditable ? (
              <div className="flex  gap-4 justify-center">
                <button
                  className="btn btn-soft btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
                  type="submit"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-soft btn-error btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
                  onClick={() => {
                    handleNoteCancel(tSpell.spell.id);
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Pencil
                  className="fill-warning cursor-pointer hover:stroke-info"
                  onClick={() => setIsNotesEditable(true)}
                />
              </div>
            )}
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setModalSpellId(null)}
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
