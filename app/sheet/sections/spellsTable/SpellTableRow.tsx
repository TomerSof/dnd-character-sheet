import React from "react";
import {
  DurationInterval,
  SpellCost,
  SpellLevel,
  TableSpell,
} from "../../types";
import { NotebookTabs, Pencil, Save, Star, Trash2 } from "lucide-react";
import { useSpellTableContext } from "@/app/contexts/SpellTableContext";
import FloatingNumInput from "@/app/components/FloatingNumInput";
import FloatingTxtInput from "@/app/components/FloatingTxtInput";
import NotesModal from "./NotesModal";

type Props = {
  tSpell: TableSpell;
};

export default function SpellTableRow({ tSpell }: Props) {
  const {
    modalSpellId,
    tableSpells,
    notesDraft,
    isNotesEditable,
    confirmDeleteModal,
    handleTSpellDelete,
    setTableSpells,
    handleNoteCancel,
    handleSpellSave,
    setConfirmDeleteModal,
    updateSpellField,
    setModalSpellId,
    setIsNotesEditable,
    setNotesDraft,
  } = useSpellTableContext();

  const COST_OPTIONS = ["Action", "Bonus Action", "Reaction", "Free"];

  return (
    <tr>
      <td>
        <Star
          className={`cursor-pointer justify-self-center ${
            tSpell.spell.isFavorite
              ? "fill-warning stroke-warning"
              : "stroke-warning"
          }`}
          onClick={() =>
            updateSpellField(
              tSpell.spell.id,
              "isFavorite",
              !tSpell.spell.isFavorite
            )
          }
        />
      </td>
      <td>
        <FloatingNumInput
          title="Level"
          placeholder="1"
          value={tSpell.spell.level}
          positive
          maxNum={9}
          isDisabled={!tSpell.isEditing}
          className="input input-sm justify-self-center max-w-[7ch] w-full min-w-0 disabled:bg-secondary disabled:text-secondary-content font-bold text-center"
          onChange={(val) =>
            updateSpellField(tSpell.spell.id, "level", val as SpellLevel)
          }
        />
      </td>
      <td>
        <FloatingTxtInput
          title="Spell Name"
          placeholder="Enter Spell Name"
          value={tSpell.spell.name}
          isDisabled={!tSpell.isEditing}
          className="input input-sm justify-self-center max-w-[25ch] w-full min-w-0 disabled:bg-secondary disabled:text-secondary-content font-bold"
          onChange={(str) => updateSpellField(tSpell.spell.id, "name", str)}
        />
      </td>
      <td>
        <div className="flex justify-center">
          <select
            value={tSpell.spell.cost || ""}
            disabled={!tSpell.isEditing}
            onChange={(e) =>
              updateSpellField(
                tSpell.spell.id,
                "cost",
                e.target.value as SpellCost
              )
            }
            className="select  disabled:bg-secondary w-[17ch] disabled:text-secondary-content font-bold"
          >
            <option value="" disabled>
              Pick Cost Type
            </option>
            {COST_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td>
        <div className="flex flex-row justify-center gap-2">
          <FloatingNumInput
            title="Duration"
            placeholder="0"
            positive
            value={tSpell.spell.duration.count}
            isDisabled={!tSpell.isEditing}
            onChange={(val) =>
              updateSpellField(tSpell.spell.id, "duration", {
                count: val,
                interval: tSpell.spell.duration.interval,
              })
            }
            className="input input-sm max-w-[7ch] w-full h-full min-w-0 disabled:bg-secondary disabled:text-secondary-content font-bold text-center"
          />
          <select
            value={tSpell.spell.duration.interval || ""}
            disabled={!tSpell.isEditing}
            onChange={(e) =>
              updateSpellField(tSpell.spell.id, "duration", {
                count: tSpell.spell.duration.count,
                interval: e.target.value as DurationInterval,
              })
            }
            className="select disabled:bg-secondary w-[10ch] disabled:text-secondary-content font-bold"
          >
            <option value="" disabled>
              Set Duration Interval
            </option>
            <option value="Min">Min</option>
            <option value="Hr">Hr</option>
            <option value="Days">Days</option>
          </select>
        </div>
      </td>
      <td>
        <div className="flex flex-row justify-center items-center gap-2">
          <FloatingNumInput
            title="Range"
            placeholder="1"
            positive
            isDisabled={!tSpell.isEditing}
            value={tSpell.spell.range}
            onChange={(val) => updateSpellField(tSpell.spell.id, "range", val)}
            className="disabled:bg-secondary w-[7ch] disabled:text-secondary-content font-bold"
          />
          <p className="text-lg font-bold text-primary-content">ft</p>
        </div>
      </td>
      <td>
        <input
          type="checkbox"
          className="checkbox checkbox-sm checkbox-accent border-0 bg-secondary-content disabled:bg-secondary disabled:text-secondary-content  disabled:opacity-70 justify-self-center flex "
          checked={tSpell.spell.concentration}
          onChange={(e) =>
            updateSpellField(tSpell.spell.id, "concentration", e.target.checked)
          }
          disabled={!tSpell.isEditing}
        />
      </td>
      <td>
        <input
          type="checkbox"
          className="checkbox checkbox-sm checkbox-accent border-0 bg-secondary-content disabled:bg-secondary disabled:text-secondary-content  disabled:opacity-70 justify-self-center flex "
          checked={tSpell.spell.ritual}
          disabled={!tSpell.isEditing}
          onChange={(e) =>
            updateSpellField(tSpell.spell.id, "ritual", e.target.checked)
          }
        />
      </td>
      <td>
        <input
          type="checkbox"
          className="checkbox checkbox-sm checkbox-accent border-0 bg-secondary-content disabled:bg-secondary disabled:text-secondary-content  disabled:opacity-70 justify-self-center flex "
          checked={tSpell.spell.requiredMaterial}
          disabled={!tSpell.isEditing}
          onChange={(e) =>
            updateSpellField(
              tSpell.spell.id,
              "requiredMaterial",
              e.target.checked
            )
          }
        />
      </td>
      <td>
        <div className="flex justify-center items-center">
          <NotebookTabs
            className="cursor-pointer stroke-info-content fill-transparent hover:fill-info transition-colors duration-500"
            onClick={() => {
              setModalSpellId(tSpell.spell.id);
              setIsNotesEditable(tSpell.isEditing);
              setNotesDraft(tSpell.spell.notes);
            }}
          />
          {modalSpellId === tSpell.spell.id && (
            <NotesModal tSpellId={tSpell.spell.id} />
          )}
        </div>
      </td>
      <td>
        <div className="flex flex-row items-center  gap-2">
          {tSpell.isEditing ? (
            <>
              <Save
                onClick={() => handleSpellSave(tSpell.spell.id)}
                className="cursor-pointer stroke-success-content fill-transparent hover:fill-success transition-colors duration-500"
              />
              <Trash2
                onClick={() => setConfirmDeleteModal(true)}
                className="cursor-pointer stroke-error-content fill-transparent hover:fill-error transition-colors duration-500"
              />
              {confirmDeleteModal && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box flex flex-col gap-5 items-center bg-primary">
                    <h3 className="font-bold text-lg text-primary-content">
                      Are you sure you want to delete{" "}
                      <span className="text-warning font-semibold underline">
                        {tSpell.spell.name}
                      </span>
                      ?
                    </h3>
                    <div className="flex flex-row gap-10 justify-center">
                      <button
                        onClick={() => handleTSpellDelete(tSpell.spell.id)}
                        className="btn btn-success"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setConfirmDeleteModal(false)}
                        className="btn btn-error"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </dialog>
              )}
            </>
          ) : (
            <Pencil
              className="cursor-pointer fill-transparent hover:fill-warning transition-colors duration-500"
              onClick={() =>
                setTableSpells(
                  tableSpells.map((ts) =>
                    ts.spell.id === tSpell.spell.id
                      ? { ...ts, isEditing: true }
                      : ts
                  )
                )
              }
            />
          )}
        </div>
      </td>
    </tr>
  );
}
