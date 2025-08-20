import { NFT, Payment, Status } from "../models/payment";
import httpInstance from "./httpInstance";

const PAYMENT_ENDPOINT = "/payments";

export const paymentService = {
  async createPayment(input: CreatePayment) {
    const response = await httpInstance.post<CreatePaymentOutput>(`${PAYMENT_ENDPOINT}/create-payment-link`, input);
    return response.data;
  },

  async createFreePayment(input: CreateFreePayment) {
    const response = await httpInstance.post<CreateFreePaymentOutput>(`${PAYMENT_ENDPOINT}/create-free-payment`, input);
    return response.data;
  },

  async updatePayment(input: UpdatePayment) {
    const response = await httpInstance.post<Payment>(`${PAYMENT_ENDPOINT}/update-payment-callback`, input);
    return response.data;
  },
};

// CreatePayment
type CreatePayment = Pick<Payment, "userId" | "eventId" | "eventName" | "walletPublicKey" | "provider" | "prName"> & {
  nfts: NFTDTO[];
};

export type NFTDTO = Pick<NFT, "collectionName" | "collectionSymbol" | "imageUrl" | "type" | "unitPrice"> & { quantity: number };

export interface CreatePaymentOutput {
  success: number;
  message: string;
  data?: {
    url: string;
  };
}

// CreateFreePayment
type CreateFreePayment = Pick<Payment, "userId" | "eventId" | "eventName" | "walletPublicKey" | "prName"> & {
  nfts: FreePaymentNFT[];
};

export type FreePaymentNFT = Pick<NFT, "collectionName" | "collectionSymbol" | "imageUrl" | "type" | "unitPrice"> & { quantity: number };

export interface CreateFreePaymentOutput {
  success: number;
  message: string;
  data?: {
    id: string;
  };
}

// UpdatePayment
interface UpdatePayment {
  id: string;
  callbackStatus: Status;
}
