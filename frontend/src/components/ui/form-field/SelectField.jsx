"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { ChevronDown, AlertCircle, List } from "lucide-react";

const SelectField = ({
  id,
  name,
  label,
  options = [],
  value = "",
  onChange,
  onBlur,
  required = false,
  disabled = false,
  validate = null,
  errorMessage = "",
  placeholder = "Select an option",
  className = "",
}) => {
  const [error, setError] = useState(errorMessage);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  const handleChange = (e) => {
    if (onChange) onChange(e);

    if (touched && validate) {
      const validationError = validate(e.target.value);
      setError(validationError);
    }
  };

  const handleBlur = (e) => {
    setTouched(true);
    if (onBlur) onBlur(e);

    if (validate) {
      const validationError = validate(e.target.value);
      setError(validationError);
    }
  };

  return (
    <div className={`w-full space-y-2 ${className}`}>
      {label && (
        <Label
          htmlFor={id}
          className={`text-sm font-medium ${
            required
              ? "after:content-['*'] after:ml-0.5 after:text-red-500"
              : ""
          }`}
        >
          {label}
        </Label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <List className="h-4 w-4 text-gray-500" />
        </div>

        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`
            w-full rounded-md border text-sm transition-colors appearance-none
            pl-10 pr-10 py-2
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20
          `}
          aria-invalid={error ? "true" : "false"}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {error ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default SelectField;
