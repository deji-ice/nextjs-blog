import React from "react";
import { LucideIcon } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  const variants = {
    primary: "bg-indigo-900 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline:
      "bg-transparent border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-50",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-[13px]",
    lg: "px-8 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

export default Button;
