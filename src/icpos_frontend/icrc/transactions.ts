import { ApiGet, isResponseOk } from "../axios/axios";

import { Transaction } from "./types/Transaction";
import { selectorFamily } from "recoil";

type TransactionResponse = {
  data: Transaction[];
};

export const Transactions = selectorFamily<Transaction[], string>({
  key: "Transaction",
  get:
    (id: string) =>
    async ({ get }) => {
      const response = get(
        ApiGet<TransactionResponse>({
          url: `/ledgers/${
            import.meta.env.VITE_CANISTER_ID_ICRC
          }/accounts/${id}/transactions`,
        })
      );
      if (isResponseOk(response)) {
        return response.data.data;
      }
      return [];
    },
});
