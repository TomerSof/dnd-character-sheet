export type DurationInterval = "Min" | "Hr" | "Days";
export type SpellLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SpellCost = "Action" | "Bonus Action" | "Reaction" | "Free";
export type SpellDuration = { count: number; interval: DurationInterval };

export type Coin = {
  name: string;
  token: string;
  count: number;
  valueInGP: number;
};

export type Trait = {
  name: string;
  baseValue: number;
  bonusValue: number;
};

export type Skill = {
  name: string;
  baseValue: number;
  isProficient: boolean;
  bonusValue: number;
};

export type SavingThrow = {
  baseValue: number;
  isProficient: boolean;
  bonusValue: number;
};

export type Stat = {
  name: string;
  abbreviation: string;
  value: number;
  modValue: number;
  savingThrow: SavingThrow;
  skills: Skill[];
};

export type SpellCasting = {
  ability: string;
  abilityMod: number;
  spellSaveDC: number;
  spellAttackBonus: number;
};

export type Spell = {
  level: SpellLevel;
  name: string;
  duration: SpellDuration;
  cost: SpellCost;
  range: number;
  concentration: boolean;
  ritual: boolean;
  requiredMaterial: boolean;
  notes: string;
  isFavorite: boolean;
  id: string;
};

export type TableSpell = {
  spell: Spell;
  isNew: boolean;
  isEditing: boolean;
};

export type SpellSearchParams = {
  level?: SpellLevel;
  name?: string;
  cost?: SpellCost;
  concentration?: boolean;
  ritual?: boolean;
};

export type CharacterData = {
  name: string;
  species: string;
  classType: string;
  subclass: string;
  appearance: string;
  backstory: string;
  background: string;
  level: number;
  xp: number;
  maxHP: number;
  currentHP: number;
  tmpHP: number;
  hitDiceMax: number;
  hitDiceSpent: number;
  size: number;
  spellCasting: SpellCasting;
  coins: Coin[];
  traits: Trait[];
  stats: Stat[];
  spells: Spell[];
};

export type DbCharacterRow = {
  id: string;
  user_id: string;
  character: CharacterData; // JSON string
  created_at: string;
  updated_at: string;
};
