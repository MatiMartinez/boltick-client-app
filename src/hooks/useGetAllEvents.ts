import { useEffect, useState } from "react";
import { eventService } from "../services/event";
import { Event } from "../models/event";

export const useGetAllEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    eventService
      .getAllEvents()
      .then((events) => {
        setEvents(events.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { events, isLoading };
};
