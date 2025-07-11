import React, { ChangeEvent } from 'react'
import { useCharacter } from '../characterContext'

export default function SpellCastingInfo() {
  const { stats, spellCasting, setSpellCasting } = useCharacter();

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSpellCasting(e.target.value);
  }
  return (
    <div className='flex flex-col justify-center bg-secondary-content  border px-5 py-5'>

      <label className="select self-center bg-secondary/60 border-current mb-10">
        <span className="label text-current underline">Spell Casting Ability:</span>
        <select>
          <option disabled={true} className='text-center '>Choose Ability</option>
          {stats.map(stat => (
            <option key={stat.abbreviation} value={stat.abbreviation} className="text-center text-accent">
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
            className="input input-lg w-[15ch] disabled:bg-secondary/60 disabled:border-current disabled:border-3 text-center font-bold"
            disabled value={spellCasting.abilityMod} />
        </label>

        <label className="floating-label ">
          <span className='text-secondary font-bold'>Spell Save DC</span>
          <input
            type="text"
            className="input input-lg w-[15ch] disabled:bg-secondary/60 disabled:border-current disabled:border-3  text-center font-bold"
            disabled value={spellCasting.spellSaveDC} />
        </label>

        <label className="floating-label">
          <span className='text-secondary font-bold rounded-2xl'>Attack Bonus</span>
          <input
            type="text"
            className="input input-lg w-[15ch] disabled:bg-secondary/60 disabled:border-current disabled:border-3  text-center font-bold"
            
            disabled value={spellCasting.spellAttackBonus} />
        </label>
      </div>
    </div>
  )
}
