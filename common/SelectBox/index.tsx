import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

type SelectBoxProps = {
    label?: string;
    options: { label: string; value: string | number }[];
    placeholder?: string;
    value?: string | number;
    onChange?: (value: string | number) => void;
    onClearChange?: () => void;
    loading?: boolean;
};

const SelectBox = ({
    label,
    options,
    placeholder,
    value,
    onChange,
    onClearChange,
    loading = false,
}: SelectBoxProps) => {
    const [selectedValue, setSelectedValue] = useState<string>(value ? String(value) : "");

    useEffect(() => {
        setSelectedValue(value ? String(value) : "");
    }, [value]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(e.target.value);
        onChange?.(e.target.value as string | number);
    };

    const handleClearSelection = () => {
        setSelectedValue("");
        onClearChange?.();
    };

    return (
        <>
            {label && (
                <label htmlFor="selectBox" className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id="selectBox"
                    value={selectedValue}
                    onChange={handleSelectChange}
                    disabled={loading}
                    className={`bg-white border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 
                     appearance-none dark:bg-white dark:border-gray-600 
                     dark:placeholder-gray-400 dark:text-gray-900 
                     dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                         loading ? 'opacity-50 cursor-not-allowed' : ''
                     }`}
                >
                    <option value="" disabled>
                        {placeholder || label}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {loading ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500"></div>
                    </div>
                ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                )}

                {selectedValue && !loading && (
                    <button
                        onClick={handleClearSelection}
                        className="absolute right-8 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        type="button"
                    >
                        <XMarkIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                    </button>
                )}
            </div>
        </>
    );
};

export default SelectBox;
