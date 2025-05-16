import React from "react";
import PropTypes from "prop-types";

export const Label = ({
  htmlFor,
  children,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium leading-none ${
        required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
      } ${className}`}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};
