import { useCallback, useEffect, useState } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";

import { ticketService } from "../services/tickets";
import { Ticket } from "../models/ticket";
import useSession from "./useSession";

const useUserTickets = () => {
  const toast = useToast();
  const { walletAddress } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

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

  const handleShowQR = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    onOpen();
  };

  return {
    tickets,
    isLoading,
    refreshTickets,
    selectedTicket,
    isOpen,
    onClose,
    handleShowQR,
  };
};

export default useUserTickets;
