import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small timeout to allow render before animation
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "unset";
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted || !shouldRender) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div 
        className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-labelledby="modal-title" 
        role="dialog" 
        aria-modal="true"
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop */}
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            aria-hidden="true" 
            onClick={onClose}
        ></div>

        {/* Modal Panel */}
        <div 
            className={`
                relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl 
                transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg
                ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 sm:translate-y-0 sm:scale-95'}
            `}
        >
            {/* Header */}
            <div className="bg-white px-4 pt-4 pb-2 sm:px-6 flex justify-between items-center">
                {title ? (
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                        {title}
                    </h3>
                ) : <div></div>}
                
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-golden-rod-500 rounded-full p-1 transition-colors"
                >
                    <FaTimes className="h-5 w-5" />
                </button>
            </div>
            
            {/* Content */}
            <div className="bg-white px-4 pt-2 pb-4 sm:p-6 sm:pb-4">
               {children}
            </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
