import React, { ChangeEvent } from 'react'
import { useCharacter } from '../../contexts/CharacterContext'

export default function SpellCastingInfo() {
  const { stats, spellCasting, setSpellCasting } = useCharacter();

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSpellCasting(e.target.value);
  }
  return (
    <div className='flex flex-col justify-center bg-primary/60 border-secondary rounded border-2 px-5 py-5'>
      <label className="select self-center border-3 border-secondary mb-10">
        <span className="label font-fantasy text-secondary font-extrabold  underline">Spell Casting Ability:</span>
        <select>
          <option disabled={true} className='text-center '>Choose Ability</option>
          {stats.map(stat => (
            <option key={stat.abbreviation} value={stat.abbreviation} className="text-center text-secondary-content bg-secondary">
              {stat.abbreviation}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-wrap gap-4 justify-center">
        <label className="floating-label">
          <span className='text-secondary font-bold'>Spell Mod</span>
          <input
            type="text"
            className="input input-lg w-[15ch] disabled:bg-secondary/60 disabled:border-current disabled:border-3 text-center disabled:cursor-text font-bold"
            disabled value={spellCasting.abilityMod} />
        </label>

        <label className="floating-label ">
          <span className='text-secondary font-bold'>Spell Save DC</span>
          <input
            type="text"
            className="input input-lg w-[15ch] disabled:bg-secondary/60 disabled:border-current disabled:border-3 disabled:cursor-text text-center font-bold"
            disabled value={spellCasting.spellSaveDC} />
        </label>

        <label className="floating-label">
          <span className='text-secondary font-bold rounded-2xl'>Attack Bonus</span>
          <input
            type="text"
            className="input input-lg w-[15ch] disabled:bg-secondary/60 disabled:border-current disabled:border-3 disabled:cursor-text text-center font-bold"
            
            disabled value={spellCasting.spellAttackBonus} />
        </label>
      </div>
    </div>
  )
}
