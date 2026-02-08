import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", wrapperClassName = "", label, error, id, icon, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={`w-full ${wrapperClassName}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-black-beauty-700 font-raleway mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative flex rounded-md shadow-sm">
          {icon && (
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-black-beauty-200 bg-gray-50 px-3 text-gray-500">
              {icon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={`
              block w-full border px-3 py-2 font-raleway transition-all duration-200
              placeholder:text-black-beauty-300
              focus:outline-none focus:ring-1 focus:z-10
              disabled:cursor-not-allowed disabled:bg-black-beauty-50 disabled:text-black-beauty-400
              ${icon ? 'rounded-none rounded-r-md' : 'rounded-md shadow-sm'}
              ${
                error
                  ? "border-barbados-cherry-500 text-barbados-cherry-900 focus:border-barbados-cherry-500 focus:ring-barbados-cherry-500"
                  : "border-black-beauty-200 text-black-beauty-900 focus:border-golden-rod-500 focus:ring-golden-rod-500 hover:border-black-beauty-300"
              }
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-barbados-cherry-500 font-raleway animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
