import React from "react";
import { FaCheck } from "react-icons/fa";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", wrapperClassName = "", label, error, id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substr(2, 9);

    return (
      <div className={`flex items-start ${wrapperClassName}`}>
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              id={inputId}
              ref={ref}
              type="checkbox"
              className="peer sr-only"
              {...props}
            />
            <div
              className={`
                w-5 h-5 border rounded cursor-pointer flex items-center justify-center transition-all duration-200
                peer-focus:ring-2 peer-focus:ring-golden-rod-500 peer-focus:ring-offset-2
                peer-checked:bg-golden-rod-500 peer-checked:border-golden-rod-500
                text-white
                ${
                  error
                    ? "border-barbados-cherry-500"
                    : "border-gray-300 hover:border-golden-rod-400"
                }
                bg-white
                ${className}
              `}
            >
              <FaCheck className="w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
            </div>
          </div>
        </div>
        {label && (
          <div className="ml-3 text-sm">
            <label
              htmlFor={inputId}
              className="font-medium text-black-beauty-700 font-raleway select-none cursor-pointer"
            >
              {label}
            </label>
            {error && (
              <p className="mt-1 text-sm text-barbados-cherry-500 font-raleway animate-in slide-in-from-top-1">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
