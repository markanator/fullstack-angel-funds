import { useMutation } from 'react-query';
import axios from  '../axios/instance';

export interface newDono {
  amount: number;
  stripeCreatedAt: string;
  stripeCustomerId: string;
  stripeReceiptUrl: string;
}

export const donateToProject = (projectId: number, payload: newDono) => {
  return axios.post(`/donations/${projectId}`, payload)
}