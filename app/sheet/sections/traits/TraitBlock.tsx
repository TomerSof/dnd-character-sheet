import React from "react";
import TraitBlockSVG from "../../svg/TraitBlockSVG";
import FloatingNumInput from "@/app/components/FloatingNumInput";

interface TraitsBlockProps {
  TraitText: string;
  onValueChange?: (index: number, value: number) => void;
  TraitValue?: number;
  Index: number;
}

export default function TraitBlock({
  TraitText,
  onValueChange,
  Index,
  TraitValue,
}: TraitsBlockProps) {
  const [localValue, setLocalValue] = React.useState(TraitValue);

  React.useEffect(() => {
    setLocalValue(TraitValue);
  }, [TraitValue]);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
      <TraitBlockSVG className="bg-primary rounded-tl-2xl  rounded-br-2xl w-full" />
      <div className="absolute top-[17%] left-1/2 transform -translate-x-1/2 text-center w-[90%] sm:w-[80%]">
        <p
          style={{ fontSize: "clamp(0.7rem, 1.3vw, 1.2rem)" }}
          className="font-fantasy  text-outline-base-content font-extrabold text-secondary underline underline-offset-2 mb-2 break-words whitespace-normal"
        >
          {TraitText}
        </p>
        <div className="flex justify-center">
          <FloatingNumInput
            onChange={(val) => onValueChange?.(Index, val)}
            value={localValue}
            title=""
            placeholder="0"
            positive
            labelClass=""
            className="
            w-full 
            max-w-[6ch] sm:max-w-[8ch] md:max-w-[12ch] 
            text-center 
            font-bold 
            text-[clamp(0.75rem,1.2vw,1rem)] sm:text-[clamp(0.85rem,1.5vw,1.4rem)] 
            rounded-md 
            border-2 
            hover:border-secondary
            h-[clamp(2rem,4vw,2.5rem)] sm:h-[clamp(1.7rem,3vw,3rem)]
            px-1 sm:px-2
          "
          />
        </div>
      </div>
    </div>
  );
}
