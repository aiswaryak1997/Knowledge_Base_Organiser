import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) {
  const baseClass = "px-4 py-2 rounded-xl font-semibold transition-colors duration-200";

  const variantClass =
    variant === "secondary"
      ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
      : "bg-emerald-600 text-white hover:bg-emerald-700";

  const disabledClass = disabled ? "opacity-50 cursor-not-allowed hover:bg-none" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${disabledClass}`}
      {...rest}
    >
      {children}
    </button>
  );
}