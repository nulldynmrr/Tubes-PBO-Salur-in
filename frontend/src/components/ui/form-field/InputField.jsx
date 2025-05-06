"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  CreditCard,
  Globe,
  MapPin,
  Search,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

const InputField = ({
  id,
  name,
  label,
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  required = false,
  disabled = false,
  validate = null,
  errorMessage = "",
  className = "",
  icon = null,
}) => {
  const [error, setError] = useState(errorMessage);
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Determine which icon to use based on type or explicit icon prop
  const getIcon = () => {
    if (icon) return icon;

    switch (type) {
      case "email":
        return <Mail className="h-4 w-4 text-gray-500" />;
      case "password":
        return <Lock className="h-4 w-4 text-gray-500" />;
      case "tel":
        return <Phone className="h-4 w-4 text-gray-500" />;
      case "date":
        return <Calendar className="h-4 w-4 text-gray-500" />;
      case "url":
        return <Globe className="h-4 w-4 text-gray-500" />;
      case "search":
        return <Search className="h-4 w-4 text-gray-500" />;
      case "number":
        return <CreditCard className="h-4 w-4 text-gray-500" />;
      default:
        return name.toLowerCase().includes("name") ? (
          <User className="h-4 w-4 text-gray-500" />
        ) : name.toLowerCase().includes("address") ? (
          <MapPin className="h-4 w-4 text-gray-500" />
        ) : null;
    }
  };

  const iconElement = getIcon();

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
        {iconElement && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {iconElement}
          </div>
        )}

        <input
          id={id}
          name={name}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full rounded-md border text-sm transition-colors
            ${iconElement ? "pl-10" : "pl-3"} ${
            type === "password" ? "pr-10" : "pr-3"
          } py-2
            ${disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-400 focus:ring-blue-400"
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-20
          `}
          aria-invalid={error ? "true" : "false"}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}

        {error && (
          <div
            className={`absolute inset-y-0 ${
              type === "password" ? "right-8" : "right-0"
            } flex items-center pr-3 pointer-events-none`}
          >
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
