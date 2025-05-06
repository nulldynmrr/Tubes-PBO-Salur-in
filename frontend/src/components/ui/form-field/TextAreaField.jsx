"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { AlertCircle, FileText } from "lucide-react";

const TextAreaField = ({
  id,
  name,
  label,
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  required = false,
  disabled = false,
  validate = null,
  errorMessage = "",
  rows = 4,
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
        <div className="absolute top-3 left-3 pointer-events-none">
          <FileText className="h-4 w-4 text-gray-500" />
        </div>

        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          className={`
            w-full rounded-md border text-sm transition-colors
            pl-10 pr-3 py-2
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-400 focus:ring-blue-400"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20 resize-y
          `}
          aria-invalid={error ? "true" : "false"}
        />

        {error && (
          <div className="absolute top-3 right-3 pointer-events-none">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextAreaField;
