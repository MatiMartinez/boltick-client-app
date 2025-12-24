import { Ticket } from "../models/ticket";
import httpInstance, { IAPIResponse } from "./httpInstance";

const TICKETS_ENDPOINT = "/tickets";

export const ticketService = {
  async getTickets(input: string) {
    const response = await httpInstance.get<{ tickets: Ticket[] }>(`${TICKETS_ENDPOINT}/get-tickets/${input}`, { isPrivate: true });
    return response.data;
  },

  async getTicketsByWallet(input: string): Promise<IAPIResponse<Ticket[]>> {
    const response = await httpInstance.get<IAPIResponse<Ticket[]>>(`${TICKETS_ENDPOINT}/get-tickets-by-wallet/${input}`, { isPrivate: true });
    return response.data;
  },

  async generateEntry(input: string) {
    const response = await httpInstance.post<GenerateEntryOutput>(`${TICKETS_ENDPOINT}/generate-entry`, { ticketNumber: input }, { isPrivate: true });
    return response.data;
  },
};

export interface GenerateEntryOutput {
  success: number;
  message: string;
  data?: {
    token: string;
  };
}
