import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  value: string | number;
  onChange: (value: any) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  error?: string;
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder = "Seleccionar...",
  className = "",
  error,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        className={`relative w-full bg-white border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-golden-rod-500 focus:border-golden-rod-500 sm:text-sm ${
          error ? "border-red-300" : "border-gray-300"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? "listbox-label" : undefined}
      >
        <span className={`block truncate ${!selectedOption ? "text-gray-500" : "text-gray-900"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black/5 overflow-auto focus:outline-none sm:text-sm">
          <ul tabIndex={-1} role="listbox" aria-labelledby={label ? "listbox-label" : undefined}>
            {options.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-golden-rod-50 hover:text-golden-rod-900 text-gray-900`}
                id={`listbox-option-${option.value}`}
                role="option"
                aria-selected={value === option.value}
                onClick={() => handleSelect(option.value)}
              >
                <span
                  className={`block truncate ${
                    value === option.value ? "font-semibold" : "font-normal"
                  }`}
                >
                  {option.label}
                </span>
                {value === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-golden-rod-600">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
