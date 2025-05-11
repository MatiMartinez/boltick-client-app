import { Ticket } from '../models/ticket';
import httpInstance from './httpInstance';

const PAYMENT_ENDPOINT = '/tickets';

export const ticketService = {
  async getTickets(input: string) {
    const response = await httpInstance.get<{ tokens: Ticket[] }>(`${PAYMENT_ENDPOINT}/get-tickets/${input}`);
    return response.data;
  },
};
