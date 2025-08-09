import { useCallback, useEffect, useState, useRef } from "react";
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
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [generatingTicketId, setGeneratingTicketId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    refreshTickets();
  }, [walletAddress]);

  const refreshTickets = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await ticketService.getTickets(walletAddress);

      const orderedTickets = data.tickets.sort((a, b) => {
        // Primero ordenar por uso: no usados (0) primero, usados (1) al final
        if (a.used !== b.used) {
          return a.used - b.used;
        }
        // Dentro del mismo grupo de uso, ordenar por fecha (más recientes primero)
        return b.useDate - a.useDate;
      });
      setTickets(orderedTickets);

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

  const handleShowQR = async (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setGeneratingTicketId(ticket.ticketNumber);

    try {
      const response = await ticketService.generateEntry(ticket.ticketNumber);

      if (response.success === 1 && response.data?.token) {
        setQrToken(response.data.token);
        setTimeLeft(30);
        onOpen();

        countdownRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              handleCloseQR();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        timerRef.current = setTimeout(() => {
          handleCloseQR();
        }, 30000);
      } else {
        toast({
          title: "Error al generar QR",
          description: "No se pudo generar el código QR",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error al generar QR",
        description: "No se pudo generar el código QR",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setGeneratingTicketId(null);
    }
  };

  const handleCloseQR = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }

    setQrToken(null);
    setTimeLeft(0);
    setSelectedTicket(null);
    onClose();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  return {
    tickets,
    isLoading,
    refreshTickets,
    selectedTicket,
    isOpen,
    onClose: handleCloseQR,
    handleShowQR,
    qrToken,
    timeLeft,
    generatingTicketId,
  };
};

export default useUserTickets;
