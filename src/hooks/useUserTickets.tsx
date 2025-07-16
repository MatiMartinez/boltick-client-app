import { useCallback, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

import { ticketService } from "../services/tickets";
import { Ticket } from "../models/ticket";
import useSession from "./useSession";

const useUserTickets = () => {
  const toast = useToast();
  const { walletAddress } = useSession();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshTickets();
  }, [walletAddress]);

  const refreshTickets = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await ticketService.getTickets(walletAddress);
      setTickets(data.tickets);

      toast({
        title: "Tickets cargados",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      setTickets([]);

      toast({
        title: "Error al cargar los tickets",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, walletAddress]);

  return { tickets, isLoading, refreshTickets };
};

export default useUserTickets;
