"use client";

// Styles
import "./style.scss";

type ButtonProps = {
    type?: "button" | "submit";
    label?: string;
    customClassName?: string;
    disabled?: boolean;
    onClick?: () => void;
    isPending?: boolean;
    icon?: React.ReactNode;
};

const Button = ({
    type,
    label = "",
    customClassName,
    disabled = false,
    onClick,
    isPending = false,
    icon,
}: ButtonProps) => {
    return (
        <button
            type={type}
            className={`cursor-pointer ${customClassName}`}
            disabled={disabled || isPending}
            onClick={onClick}
        >
            <span className="flex items-center justify-center gap-2">
                {isPending && <span className="button__pending"></span>}
                {label && <span>{label}</span>}
                {icon && icon}
            </span>
        </button>
    );
};

export default Button;
