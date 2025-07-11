import React from 'react';

interface StatBlockProps extends React.SVGProps<SVGSVGElement> {
    statText: string;
    onStatChange?: (index: number, value: number) => void;
    statValue?: number;
    modifierValue: number,
    statIdx: number

}


export default function StatBlock({
    statText,
    onStatChange,
    statValue,
    modifierValue,
    statIdx,
    ...props }: StatBlockProps) {


    const [localStatValue, setLocalStatValue] = React.useState(statValue);
    const [localModifierValue, setLocalModifierValue] = React.useState(modifierValue);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.valueAsNumber;
        if (isNaN(inputValue) || inputValue < 0) inputValue = 0;
        const updatedStatValue = Math.min(inputValue, 20);
        setLocalStatValue(updatedStatValue);
        const updatedModifier = Math.floor(((updatedStatValue ?? 0) -10)/2);
        setLocalModifierValue(updatedModifier);
        onStatChange?.(statIdx,e.target.valueAsNumber);
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            
            viewBox="0 0 142.000000 175.000000"
            preserveAspectRatio="xMidYMid meet"
            fill="currentColor"
            style={{ width: '70%', height: 'auto' }}
            {...props}
        >
            <metadata>
                {"\nCreated by potrace 1.16, written by Peter Selinger 2001-2019\n"}
            </metadata>
            <g
                transform="translate(0.000000,175.000000) scale(0.100000,-0.100000)"
                
            >
                <path d="M162 1691 c-8 -19 -30 -38 -58 -51 -46 -23 -48 -28 -38 -92 9 -52 24 -48 24 6 0 38 3 45 24 50 13 3 40 24 60 46 l36 40 493 0 494 0 13 -26 c8 -14 34 -37 57 -51 41 -24 43 -27 43 -71 1 -56 15 -40 25 28 l6 45 -50 27 c-34 19 -53 36 -57 53 l-6 25 -527 0 -526 0 -13 -29z" />
                <path d="M44 1430 c-10 -117 -1 -188 22 -169 9 8 12 25 8 57 -4 35 -3 43 5 32 6 -8 11 -33 11 -54 0 -32 -7 -45 -38 -75 -35 -33 -37 -39 -30 -76 3 -22 14 -141 23 -264 l17 -224 -21 -37 c-25 -44 -28 -122 -6 -160 8 -14 14 -41 15 -61 0 -28 -5 -38 -20 -42 -21 -5 -27 -31 -10 -42 6 -3 10 -1 10 4 0 6 5 11 10 11 6 0 8 -15 4 -40 l-7 -40 109 0 c100 0 112 -2 139 -24 l29 -23 -24 -7 c-46 -13 -80 -28 -80 -35 0 -14 126 -50 209 -61 90 -12 112 -9 59 9 -18 6 -46 23 -63 37 l-30 25 40 -5 c21 -3 51 -14 66 -25 58 -43 359 -44 418 0 14 10 42 22 61 25 l35 7 -24 -26 c-13 -15 -39 -31 -58 -38 -54 -18 -32 -21 58 -9 83 11 209 47 209 61 0 7 -34 22 -80 35 l-24 7 29 23 c27 22 39 24 138 24 l109 0 -7 40 c-4 26 -3 40 4 40 6 0 11 -5 11 -11 0 -5 5 -7 10 -4 17 11 11 37 -10 42 -15 4 -20 14 -20 42 1 20 7 47 15 61 22 38 19 116 -7 161 l-21 38 17 228 c9 125 20 244 25 263 7 32 4 38 -26 65 -42 38 -55 81 -37 121 14 29 14 29 9 -16 -5 -43 7 -82 21 -68 11 12 15 130 7 207 l-8 75 -29 -100 c-38 -132 -40 -147 -24 -177 10 -20 11 -56 7 -154 -5 -95 4 -612 11 -653 0 -3 7 4 15 14 9 12 15 43 16 75 1 51 2 53 11 28 25 -69 -51 -187 -168 -262 -53 -34 -101 -39 -90 -8 3 8 6 24 6 34 0 19 2 19 22 5 40 -28 47 -17 12 18 -19 19 -34 42 -34 52 -1 11 -7 30 -15 44 l-15 25 7 -30 c12 -44 8 -124 -6 -138 -10 -9 -11 -1 -5 40 26 200 -267 349 -519 264 -139 -47 -226 -154 -214 -264 5 -40 4 -48 -6 -38 -14 14 -16 92 -4 136 12 44 -7 18 -27 -37 -10 -26 -29 -57 -43 -68 -30 -23 -13 -27 21 -5 23 15 24 15 28 -16 3 -21 0 -33 -10 -37 -22 -8 14 -32 48 -32 15 0 36 -11 50 -25 l23 -25 -27 0 c-16 0 -51 18 -91 48 -35 26 -86 62 -112 81 -26 19 -60 48 -74 65 -25 30 -25 34 -18 106 9 82 12 696 4 709 -2 5 3 27 12 50 16 40 15 45 -5 109 -11 37 -27 90 -35 117 l-14 50 -9 -105z m748 -841 c81 -16 167 -66 203 -117 25 -37 30 -53 30 -102 0 -79 -38 -132 -126 -178 -125 -64 -271 -64 -399 0 -170 86 -173 270 -6 355 96 49 193 63 298 42z" />
            </g>

            {/*Stat Base*/}
            <text
                x="50%"
                y="15%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontFamily="fantasy"
                className="text-accent" fill="currentColor"
            >
                {statText}
            </text>

            <foreignObject className='' x="20" y="40" width="100" height="55">
                <input
                    type="number"
                    value={localStatValue}
                    onChange={handleChange}
                    max = {20}
                    className='text-center text-3xl w-full h-full rounded-lg pl-3'
                    

                />
            </foreignObject>

            {/*Modifier*/}
            <defs>
                <path
                    id="arcPath"
                    d="M 10,170 A 60,60 0 0 1 132,170"
                />
            </defs>
            <text fontSize="12" fontWeight="bold" className="text-accent" fill="currentColor">
                <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
                    Modifier
                </textPath>
            </text>
            <foreignObject className='' x="52" y="125" width="35" height="40">
                <p className='text-center text-info text-xl w-full h-full rounded-4xl'>{localModifierValue}</p>
            </foreignObject>
        </svg>

    );
}
