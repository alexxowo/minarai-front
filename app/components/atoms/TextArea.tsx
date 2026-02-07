import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", wrapperClassName = "", label, error, id, ...props }, ref) => {
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
        <div className="relative">
          <textarea
            id={inputId}
            ref={ref}
            className={`
              block w-full rounded-md border px-3 py-2 shadow-sm font-raleway transition-all duration-200
              placeholder:text-black-beauty-300
              focus:outline-none focus:ring-1 min-h-[100px]
              disabled:cursor-not-allowed disabled:bg-black-beauty-50 disabled:text-black-beauty-400
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

TextArea.displayName = "TextArea";
