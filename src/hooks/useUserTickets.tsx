import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { ticketService } from '../services/tickets';
import { Ticket } from '../models/ticket';
import useSession from './useSession';

const useUserTickets = () => {
  const toast = useToast();
  const { isConnected, address } = useSession();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshTickets();
  }, []);

  const refreshTickets = async () => {
    if (!isConnected || !address) return;

    setIsLoading(true);

    try {
      const data = await ticketService.getTickets(address);
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
  };

  return { tickets, isLoading, refreshTickets };
};

export default useUserTickets;
