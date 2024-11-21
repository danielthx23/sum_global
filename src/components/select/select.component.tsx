"use client"

import { SelectHTMLAttributes, ChangeEvent, useCallback, ReactNode, useState, useMemo } from "react";
import { BiChevronDown } from "react-icons/bi";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  handleChange?: (value: string, e: ChangeEvent<HTMLSelectElement>) => void;
  label?: ReactNode;
  customError?: string | null;
  options: { value: string; label: string }[]; // Array of options
}

const Select = ({ handleChange, disabled, className = '', label = '', customError = '', options, ...props }: SelectProps) => {
  const [error, setError] = useState<string | null>(null);

  const onHandleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { validity, validationMessage, value } = e.target;
    setError(!validity.valid ? validationMessage : null);
    if (handleChange instanceof Function) {
      handleChange(value, e); // This is now correctly typed
    }
  }, [handleChange]);

  const errorMessage = useMemo(() => customError || error, [customError, error]);
  const hasActionsState = useMemo(() => disabled, [disabled]);
  const hasControllState = useMemo(() => hasActionsState || errorMessage, [hasActionsState, errorMessage]);
  const canShowError = useMemo(() => errorMessage && !hasActionsState, [errorMessage, hasActionsState]);

  return (
    <div className='w-full h-fit relative'>
      {label && (
        <label
          htmlFor={props.id ?? props.name ?? ''}
          className={`block font-medium mb-0.5 text-left text-neutral-900 text-sm`}
        >
          {label}
        </label>
      )}
      <div className={`relative ${className}`}>
        <select
          {...props}
          onChange={onHandleChange}
          className={`
            rounded-lg px-4 py-2 h-fit w-full bg-backgroundlight placeholder-neutral-400 outline-none
            ${!hasControllState ? 'bg-backgroundlight' : ''}
            ${disabled ? 'bg-foregroundopacity20 cursor-not-allowed' : ''} 
            ${canShowError ? 'border-red-500 border-2 ring-red-500' : ''}
            appearance-none pr-10 transition duration-200 ease-in-out
          `}
          disabled={disabled} // Use disabled to prevent interaction
        >
          <option value="" disabled>Selecione uma opção</option> {/* Optional placeholder */}
          {options.map(option => (
            <option key={option.value} value={option.value} className="bg-backgroundlight rounded-md">
              {option.label}
            </option>
          ))}
        </select>
        <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ease-in-out text-2xl`}>
          <BiChevronDown/>
        </span>
      </div>
      {canShowError && (
        <span className={`min-h-4 text-red-500 text-xs px-0.5 pt-0.5 block leading-none`}>
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default Select;