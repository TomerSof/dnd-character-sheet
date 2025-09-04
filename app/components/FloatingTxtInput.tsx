import React from "react";

interface FloatingTxtInputProps {
  title: string;
  placeholder: string;
  className?: string;
  value?: string;
  isDisabled?: boolean;
  labelClass?: string;
  spanClass?: string;
  type?: string;
  onChange?: (value: string) => void;
}

export default function FloatingTxtInput({
  title,
  placeholder,
  className,
  labelClass,
  value,
  isDisabled,
  spanClass,
  type = "text",
  onChange,
}: FloatingTxtInputProps) {
  return (
    <label className={"floating-label " + labelClass}>
      <span className={spanClass}>{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={isDisabled}
        onChange={(e) => onChange?.(String(e.target.value))}
        className={"input input-md " + className}
      />
    </label>
  );
}
