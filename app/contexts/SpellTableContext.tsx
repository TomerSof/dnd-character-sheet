// SpellTableContext.tsx
import { Spell, SpellSearchParams, TableSpell } from "@/app/sheet/types";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useCharacter } from "./CharacterContext";
import { v4 as uuidv4 } from "uuid";

type SpellTableContextType = {
  searchParameters: SpellSearchParams | undefined;
  setSearchParameters: React.Dispatch<
    React.SetStateAction<SpellSearchParams | undefined>
  >;
  tableSpells: TableSpell[];
  setTableSpells: React.Dispatch<React.SetStateAction<TableSpell[]>>;
  modalSpellId: string | null;
  setModalSpellId: (id: string | null) => void;
  notesDraft: string;
  setNotesDraft: (text: string) => void;
  isNotesEditable: boolean;
  setIsNotesEditable: (val: boolean) => void;
  validationError: string | null;
  setValidationError: (val: string | null) => void;
  confirmDeleteModal: boolean;
  setConfirmDeleteModal: (val: boolean) => void;
  tableSearch: TableSpell[];
  addNewSpell: () => void;
  updateSpellField: <K extends keyof Spell>(
    id: string,
    key: K,
    value: Spell[K]
  ) => void;
  handleNoteCancel: (id: string) => void;
  handleSpellSave: (id: string) => void;
  handleTSpellDelete: (id: string) => void;
};

export const SpellTableContext = createContext<SpellTableContextType | null>(
  null
);

export const SpellTableProvider = ({ children }: { children: ReactNode }) => {
  const { spells, updateSpell, addSpell, removeSpell } = useCharacter();

  const [searchParameters, setSearchParameters] = useState<
    SpellSearchParams | undefined
  >();

  const [modalSpellId, setModalSpellId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState("");
  const [isNotesEditable, setIsNotesEditable] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const [tableSpells, setTableSpells] = useState<TableSpell[]>(() =>
    spells.map((s) => ({
      spell: s,
      isNew: false,
      id: uuidv4(),
      isEditing: false,
    }))
  );

  const tableSearch = useMemo(() => {
    if (!searchParameters) return tableSpells;

    return tableSpells.filter(({ spell, isNew }) => {
      if (isNew) return true;
      if (
        searchParameters.name &&
        !spell.name.toLowerCase().includes(searchParameters.name.toLowerCase())
      )
        return false;
      if (searchParameters.level && spell.level !== searchParameters.level)
        return false;
      if (searchParameters.cost && spell.cost !== searchParameters.cost)
        return false;
      if (
        typeof searchParameters.concentration === "boolean" &&
        spell.concentration !== searchParameters.concentration
      )
        return false;
      if (
        typeof searchParameters.ritual === "boolean" &&
        spell.ritual !== searchParameters.ritual
      )
        return false;
      return true;
    });
  }, [tableSpells, searchParameters]);

  const addNewSpell = () => {
    const newSpell: Spell = {
      level: 1,
      name: "",
      duration: { count: 1, interval: "Min" },
      cost: "Action",
      range: 0,
      concentration: false,
      ritual: false,
      requiredMaterial: false,
      notes: "",
      isFavorite: false,
      id: uuidv4(),
    };
    setTableSpells((prev) => [
      ...prev,
      { spell: newSpell, isNew: true, isEditing: true },
    ]);
  };

  const updateSpellField = <K extends keyof Spell>(
    id: string,
    key: K,
    value: Spell[K]
  ) => {
    setTableSpells((prev) =>
      prev.map((item) =>
        item.spell.id === id
          ? { ...item, spell: { ...item.spell, [key]: value } }
          : item
      )
    );
  };

  const handleNoteCancel = (id: string) => {
    const currentSpell = tableSpells.find((tSpell) => tSpell.spell.id === id);
    if (!currentSpell) return;
    setNotesDraft(currentSpell.spell.notes);
    setIsNotesEditable(false);
  };

  const handleSpellSave = (id: string) => {
    const tSpell = tableSpells.find((ts) => ts.spell.id === id);
    if (!tSpell) return;

    if (tSpell.spell.name.trim() == "") {
      setValidationError("Spell saving failed!\nPlease enter spell name.");
      setTimeout(() => setValidationError(null), 3000);
      return;
    }
    if (tSpell.spell.level > 9 || tSpell.spell.level < 1) {
      setValidationError(
        "Spell saving failed!\nPlease assure the spell level is in range of 1-9."
      );
      setTimeout(() => setValidationError(null), 3000);
      return;
    }

    setValidationError(null);

    if (tSpell.isNew) {
      addSpell(tSpell.spell);
    } else {
      updateSpell(tSpell.spell.id, tSpell.spell);
    }

    setTableSpells((prev) =>
      prev.map((ts) =>
        ts.spell.id === id ? { ...ts, isEditing: false, isNew: false } : ts
      )
    );
  };

  const handleTSpellDelete = (id: string) => {
    const tSpellToDelete = tableSpells.find((ts) => ts.spell.id === id);
    if (!tSpellToDelete) return;
    if (!tSpellToDelete.isNew) removeSpell(tSpellToDelete.spell.id);

    setTableSpells((prev) => prev.filter((ts) => ts.spell.id !== id));

    setConfirmDeleteModal(false);
  };

  return (
    <SpellTableContext.Provider
      value={{
        searchParameters,
        setSearchParameters,
        tableSpells,
        setTableSpells,
        modalSpellId,
        setModalSpellId,
        notesDraft,
        setNotesDraft,
        isNotesEditable,
        setIsNotesEditable,
        validationError,
        setValidationError,
        confirmDeleteModal,
        setConfirmDeleteModal,
        tableSearch,
        addNewSpell,
        updateSpellField,
        handleNoteCancel,
        handleSpellSave,
        handleTSpellDelete,
      }}
    >
      {children}
    </SpellTableContext.Provider>
  );
};
export const useSpellTableContext = () => {
  const ctx = useContext(SpellTableContext);
  if (!ctx) throw new Error("SpellTableContext not found");
  return ctx;
};
