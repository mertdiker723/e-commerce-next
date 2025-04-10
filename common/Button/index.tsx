"use client";

// Styles
import "./style.scss";

type ButtonProps = {
  type?: "button" | "submit";
  label: string;
  customClassName?: string;
  disabled?: boolean;
  onClick?: () => void;
  isPending?: boolean;
};

const Button = ({
  type,
  label,
  customClassName,
  disabled = false,
  onClick,
  isPending = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`button__item ${customClassName}`}
      disabled={disabled || isPending}
      onClick={onClick}
    >
      <span className="flex items-center justify-center gap-2">
        {isPending && <span className="pending"></span>}
        <span>{label}</span>
      </span>
    </button>
  );
};

export default Button;
