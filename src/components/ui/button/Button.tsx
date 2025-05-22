import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: ReactNode; // Button text or content
  size?: "none" | "ghost" | "square" | "xs" | "sm" | "md"; // Button size
  variant?: "default" | "primary" | "outline" | "popover" | "danger" | "alternate" | "link"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "default",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  // Size Classes
  const sizeClasses = {
    none: "px-0 py-3 text-sm",
    ghost: "text-base px-1 py-1",
    square: "p-3 text-sm",
    xs: "px-3 py-2 text-sm",
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-primary text-primary bg-white hover:bg-primary/10",
    popover: "border text-primary bg-white hover:bg-primary/10 shadow-xs",
    danger: "bg-error-600 text-white hover:bg-secondary/90",
    alternate: "bg-secondary text-white hover:bg-secondary/90",
    primary: "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300",
    link: "text-primary font-semibold hover:underline p-0 bg-transparent shadow-none",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition ${className} ${sizeClasses[size]
        } ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
