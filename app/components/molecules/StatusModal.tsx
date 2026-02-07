import { Modal } from "./Modal";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

type StatusType = "success" | "error" | "warning";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: StatusType;
  title: string;
  message: string;
}

export function StatusModal({ isOpen, onClose, type, title, message }: StatusModalProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />;
      case "error":
        return <FaTimesCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />;
      case "warning":
        return <FaExclamationTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />;
    }
  };

  const getButtonClass = () => {
     switch (type) {
      case "success":
        return "bg-green-600 hover:bg-green-700 focus:ring-green-500";
      case "error":
        return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
      case "warning":
        return "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center p-4">
        {getIcon()}
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-raleway">{title}</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm transition-colors ${getButtonClass()}`}
        >
          Entendido
        </button>
      </div>
    </Modal>
  );
}
