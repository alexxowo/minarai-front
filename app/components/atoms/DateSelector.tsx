import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { es } from "date-fns/locale";

// Custom styles override could be done via CSS or wrapper class, keeping it simple for now but matching Input style
// Note: react-datepicker styles need to be imported globally or here. `import "react-datepicker/dist/react-datepicker.css";`

interface DateSelectorProps {
  label?: string;
  error?: string;
  wrapperClassName?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  dateFormat?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
}

export const DateSelector = ({
  label,
  error,
  wrapperClassName = "",
  selected,
  onChange,
  placeholder = "Seleccionar fecha",
  dateFormat = "dd/MM/yyyy",
  minDate,
  maxDate,
  className = "",
  id,
  name,
  disabled
}: DateSelectorProps) => {
    
  return (
    <div className={`w-full ${wrapperClassName} relative`}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-black-beauty-700 font-raleway mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
           <FaCalendarAlt className="text-gray-400" />
        </div>
        <DatePicker
          selected={selected}
          onChange={onChange}
          dateFormat={dateFormat}
          placeholderText={placeholder}
          id={id || name}
          name={name}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          locale={es}
          className={`
              block w-full rounded-md border pl-10 pr-3 py-2 shadow-sm font-raleway transition-all duration-200
              placeholder:text-black-beauty-300
              focus:outline-none focus:ring-1 w-full
              disabled:cursor-not-allowed disabled:bg-black-beauty-50 disabled:text-black-beauty-400
              ${
                error
                  ? "border-barbados-cherry-500 text-barbados-cherry-900 focus:border-barbados-cherry-500 focus:ring-barbados-cherry-500"
                  : "border-black-beauty-200 text-black-beauty-900 focus:border-golden-rod-500 focus:ring-golden-rod-500 hover:border-black-beauty-300"
              }
              ${className}
            `}
           wrapperClassName="w-full"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-barbados-cherry-500 font-raleway animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};
