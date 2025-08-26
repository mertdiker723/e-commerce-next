"use client"

// Styles || Assets
import { HTMLInputTypeAttribute } from "react";

import "./style.scss";

type InputProps = {
  type?: HTMLInputTypeAttribute;
  id?: string;
  name?: string;
  customClassName?: string;
  required?: boolean;
  placeholder?: string;
};

const Input = ({
  type = "text",
  id,
  name,
  customClassName,
  required = false,
  placeholder
}: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      required={required}
      className={`input__item ${customClassName}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
