import { ApiGet, isResponseOk } from "./axios";

import { selector } from "recoil";

type Account = {
  balance: number;
  owner: string;
};

export const AllAccounts = selector<Account[]>({
  key: "AllAccounts",
  get: async ({ get }) => {
    const response = get(
      ApiGet({
        url: "/ledgers/mxzaz-hqaaa-aaaar-qaada-cai/accounts?offset=0&limit=20&sort_by=owner",
      })
    );
    if (isResponseOk(response)) {
      const accounts = (response.data as any).data;
      if (Array.isArray(accounts) && accounts.length > 0) {
        return accounts;
      }
    }
    return [];
  },
});
