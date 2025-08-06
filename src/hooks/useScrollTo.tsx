import { useCallback } from "react";

export const useScrollTo = () => {
  const scrollTo = useCallback((id: string) => {
    const section = document.getElementById(id);
    if (section) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 80 : 100;

      const elementPosition = section.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return scrollTo;
};
