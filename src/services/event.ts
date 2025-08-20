import { Event } from "../models/event";
import httpInstance from "./httpInstance";

const EVENT_ENDPOINT = "/events";

export const eventService = {
  async getEvent(input: string) {
    const response = await httpInstance.get<{ data: Event; message: string; success: number }>(`${EVENT_ENDPOINT}/${input}`);
    return response.data;
  },

  async getAllEvents() {
    const response = await httpInstance.get<{ data: Event[]; message: string; success: number }>(`${EVENT_ENDPOINT}`);
    return response.data;
  },
};
