import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { ticketService } from '../services/tickets';
import { Ticket } from '../models/ticket';

const useUserTickets = () => {
  const toast = useToast();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshTickets();
  }, []);

  const refreshTickets = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await ticketService.getTickets('AFzKCxdnNV3Sum3nWxs77iYBBdSfqj25PQJDq');
      setTickets(data.tokens);

      toast({
        title: 'Tickets cargados',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      setTickets([]);

      toast({
        title: 'Error al cargar los tickets',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return { tickets, isLoading, refreshTickets };
};

export default useUserTickets;
