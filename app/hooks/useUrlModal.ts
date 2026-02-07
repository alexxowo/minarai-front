import { useSearchParams } from "react-router";
import { useCallback } from "react";

export function useUrlModal(paramKey: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(paramKey);
  const isOpen = Boolean(paramValue);

  const openModal = useCallback((value: string) => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set(paramKey, value);
        return newParams;
      },
      { replace: false } // Add to history stack
    );
  }, [paramKey, setSearchParams]);

  const closeModal = useCallback(() => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete(paramKey);
        return newParams;
      },
      { replace: false } // Add to history stack? Or replace? Usually replace for closing is better to avoid "back button reopens modal" loop if desired, but user asked for sharing URL so history is good.
      // actually, standard behavior for modals in back button is usually: back closes modal. So preventDefault on back? 
      // If I push to history on open, then 'back' will pop the state (remove the param) and thus close the modal naturally.
    );
  }, [paramKey, setSearchParams]);

  return {
    isOpen,
    paramValue,
    openModal,
    closeModal,
  };
}
