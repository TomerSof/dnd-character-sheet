import { captureRejectionSymbol } from 'events';
import React from 'react'

export default function ThemeController() {
  const themes = [
    "acid","abyss","autumn","black","business","bumblebee","caramellatte","coffee","corporate","cupcake","cmyk","cyberpunk",
    "dark","dim","dracula","emerald","fantasy","forest","garden","halloween","lemonade","lofi","luxury","light","night","nord",
    "pastel","retro","silk","sunset","synthwave","valentine","wireframe","winter","aqua"
  ];


  function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1);
  }

  return (
    <div className="dropdown fixed z-100 left-20 top-1 ">
      <div tabIndex={0} role="button" className="btn btn-warning m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>

      <ul tabIndex={0} className="dropdown-content max-h-70 bg-warning rounded-box z-1 w-52 overflow-y-auto p-2 shadow-2xl">
        {themes.map(theme => (
          < li key={theme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller text-warning-content w-full btn btn-sm btn-ghost justify-start"
              aria-label={capitalizeFirstLetter(theme)}
              value={theme} />
          </li>
        ))}
      </ul>
    </div >
  )
}
