import { NFT, Payment, Status } from '../models/payment';
import httpInstance from './httpInstance';

const PAYMENT_ENDPOINT = '/payments';

export const paymentService = {
  async createPayment(input: CreatePayment) {
    const response = await httpInstance.post<{ url: string }>(`${PAYMENT_ENDPOINT}/create-payment-link`, input);
    return response.data;
  },

  async updatePayment(input: UpdatePayment) {
    const response = await httpInstance.post<Payment>(`${PAYMENT_ENDPOINT}/update-payment-callback`, input);
    return response.data;
  },
};

type CreatePayment = Pick<Payment, 'userId' | 'eventId' | 'walletPublicKey' | 'provider'> & {
  nfts: NFTDTO[];
};

export type NFTDTO = Pick<NFT, 'collectionName' | 'collectionSymbol' | 'type' | 'unitPrice'> & { quantity: number };

interface UpdatePayment {
  id: string;
  callbackStatus: Status;
}
