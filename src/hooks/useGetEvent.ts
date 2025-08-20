import { useEffect, useState } from "react";
import { eventService } from "../services/event";
import { Event } from "../models/event";

export const useGetEvent = (id?: string) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    eventService
      .getEvent(id)
      .then((event) => {
        setEvent(event.data);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return { event, isLoading };
};
