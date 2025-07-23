import { useState, useCallback } from "react";

import { Event } from "../models/event";

export default function useEventInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const open = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedEvent(null);
  }, []);

  return { isOpen, selectedEvent, open, close };
}
