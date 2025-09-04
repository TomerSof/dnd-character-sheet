import React from "react";

interface FloatingNumInputProps {
  title: string;
  placeholder: string;
  className?: string;
  positive?: boolean;
  value?: number;
  maxNum?: number;
  isDisabled?: boolean;
  labelClass?: string;
  spanClass?: string;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

export default function FloatingNumInput({
  title,
  placeholder,
  className = "",
  positive = false,
  value,
  maxNum,
  isDisabled,
  labelClass,
  spanClass,
  readonly,
  onChange,
}: FloatingNumInputProps) {
  return (
    <label className={`floating-label  ${labelClass}`}>
      <span className={spanClass}>{title}</span>
      <input
        type="number"
        placeholder={placeholder}
        min={positive ? 0 : undefined}
        max={maxNum}
        value={value}
        disabled={isDisabled}
        readOnly={readonly}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className={"input input-md " + className}
      />
    </label>
  );
}
