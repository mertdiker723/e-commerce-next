"use client";

const Checkbox = ({
    id,
    name,
    label,
    checked,
    onChange,
    customclassNameName,
}: {
    id: string;
    name: string;
    label: string;
    checked: boolean;
    onChange: () => void;
    customclassNameName?: string;
}) => {
    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${customclassNameName}`}
            />
            <label
                htmlFor={id}
                className="ms-2 text-sm font-medium text-gray-700 select-none"
            >
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
