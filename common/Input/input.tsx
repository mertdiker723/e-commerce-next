"use client";

// Styles || Assets
import { HTMLInputTypeAttribute } from "react";

type InputProps = {
    type?: HTMLInputTypeAttribute;
    id?: string;
    name?: string;
    customClassName?: string;
    required?: boolean;
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
    type = "text",
    id,
    name,
    customClassName,
    required = false,
    placeholder,
    label,
    value,
    onChange,
}: InputProps) => {
    return (
        <>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                name={name}
                required={required}
                className={`block
                  w-full rounded-md
                bg-white 
                  px-3 
                  py-1.5
                  text-base
                text-gray-900 
                  outline-1
                outline-gray-300 outline-offset-[-1px] focus:outline-2 focus:outline-indigo-600 focus:outline-offset-[-2px] placeholder:text-gray-400 placeholder:text-sm ${
                          customClassName || ""
                      }`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    );
};

export default Input;
