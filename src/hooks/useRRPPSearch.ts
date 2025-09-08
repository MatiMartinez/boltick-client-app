import { useState, useMemo } from "react";
import { PR } from "../models/event";

export function useRRPPSearch(prs: PR[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remover acentos
  };

  const fuzzySearch = (text: string, query: string): boolean => {
    if (!query) return true;

    const normalizedText = normalizeText(text);
    const normalizedQuery = normalizeText(query);

    if (normalizedText.includes(normalizedQuery)) return true;

    let queryIndex = 0;
    for (let i = 0; i < normalizedText.length && queryIndex < normalizedQuery.length; i++) {
      if (normalizedText[i] === normalizedQuery[queryIndex]) {
        queryIndex++;
      }
    }
    return queryIndex === normalizedQuery.length;
  };

  const filteredPRs = useMemo(() => {
    return prs.filter((pr) => fuzzySearch(pr.name, searchTerm));
  }, [prs, searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
  };

  return { searchTerm, setSearchTerm, filteredPRs, clearSearch };
}
