import { useState, useCallback } from "react";

export default function useEventInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const open = useCallback((eventId: string) => {
    setSelectedEventId(eventId);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedEventId(null);
  }, []);

  return { isOpen, selectedEventId, open, close };
}
