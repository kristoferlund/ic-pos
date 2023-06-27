import { Transaction } from "./types/Transaction";
import { Transactions } from "./transactions";
import { selectorFamily } from "recoil";

type TransactionParams = {
  id: string;
  index: number;
};

export const SingleTransaction = selectorFamily<
  Transaction | undefined,
  TransactionParams
>({
  key: "SingleTransaction",
  get:
    (params: TransactionParams) =>
    async ({ get }) => {
      const transactions = get(Transactions(params.id));
      return transactions.find((t) => t.index === params.index);
    },
});
