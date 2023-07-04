import { ApiGet, isResponseOk } from "../axios/axios";

import { Transaction } from "./types/transaction.type";
import axios from "axios";
import { selectorFamily } from "recoil";

type TransactionResponse = {
  data: Transaction[];
};

export type TransactionsParams = {
  id: string | undefined;
  limit?: number;
};

export const Transactions = selectorFamily<Transaction[], TransactionsParams>({
  key: "Transaction",
  get:
    (params: TransactionsParams) =>
    async ({ get }) => {
      const { id, limit = 0 } = params;
      if (!id) return [];
      const response = get(
        ApiGet<TransactionResponse>({
          url: `/ledgers/${
            import.meta.env.VITE_CANISTER_ID_ICRC
          }/accounts/${id}/transactions?limit=${limit}`,
        })
      );
      if (isResponseOk(response)) {
        return response.data.data;
      }
      return [];
    },
});

export const fetchTransactions = async (id: string, limit = 0) => {
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ICRC_API_URL,
  });
  return apiClient.get<TransactionResponse>(
    `/ledgers/${
      import.meta.env.VITE_CANISTER_ID_ICRC
    }/accounts/${id}/transactions?limit=${limit}`
  );
};
