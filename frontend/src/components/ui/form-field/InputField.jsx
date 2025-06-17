"use client";
import React from "react";

const InputField = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1 font-medium text-sm text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
