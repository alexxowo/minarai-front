import React from "react";
import { Link } from "react-router";

type ButtonVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  outlined?: boolean;
  icon?: React.ReactNode;
  to?: string; // If provided, renders as Link
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", outlined = false, icon, className = "", to, ...props }, ref) => {
    
    // Base styles
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 font-raleway";

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-2.5 text-base",
      lg: "px-8 py-3 text-lg",
    };

    // Variant definitions
    const variants = {
      primary: {
        filled: "bg-golden-rod-500 text-black-beauty-900 hover:bg-golden-rod-400 shadow-lg shadow-golden-rod-500/30",
        outlined: "border-2 border-golden-rod-500 text-golden-rod-600 hover:bg-golden-rod-50",
      },
      secondary: {
        filled: "bg-black-beauty-900 text-golden-rod-500 hover:bg-black-beauty-800 shadow-lg shadow-black-beauty-900/30",
        outlined: "border-2 border-black-beauty-900 text-black-beauty-900 hover:bg-black-beauty-50",
      },
      success: {
        filled: "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30",
        outlined: "border-2 border-green-500 text-green-600 hover:bg-green-50",
      },
      warning: {
        filled: "bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg shadow-yellow-500/30",
        outlined: "border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50",
      },
      danger: {
        filled: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30",
        outlined: "border-2 border-red-500 text-red-600 hover:bg-red-50",
      },
      ghost: {
        filled: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        outlined: "bg-transparent border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50",
      },
    };

    const variantStyles = outlined ? variants[variant].outlined : variants[variant].filled;
    const sizeStyles = sizes[size as keyof typeof sizes] || sizes.md;

    if (to) {
      return (
        <Link
          to={to}
          className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
          // @ts-ignore - Link doesn't accept ref quite the same way as button, simplifying for now
        >
          {icon && <span className="text-lg">{icon}</span>}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
