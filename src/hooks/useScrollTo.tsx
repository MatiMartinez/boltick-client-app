import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollTo = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  return scrollTo;
};
