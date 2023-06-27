import { ActorSubclass, HttpAgent } from "@dfinity/agent";
import {
  Merchant,
  _SERVICE,
} from "../../declarations/icpos_backend/icpos_backend.did";
import { atom, useRecoilState } from "recoil";

import React from "react";
import { createActor } from "../../declarations/icpos_backend";
import { useAuth } from "../auth/hooks/useAuth";

type MerchantStateType = {
  initialized: boolean;
  merchant: Merchant | undefined;
};

const MerchantState = atom<MerchantStateType>({
  key: "MerchantState",
  default: { initialized: false, merchant: undefined },
});

export function useBackend() {
  const { isAuthenticated, authClient, hasLoggedIn, identity } = useAuth();
  const [backend, setBackend] = React.useState<ActorSubclass<_SERVICE> | null>(
    null
  );
  const [merchantState, setMerchantState] = useRecoilState(MerchantState);

  React.useEffect(() => {
    if (!isAuthenticated || !authClient || !hasLoggedIn) return;
    const agent = new HttpAgent({
      identity,
      host: import.meta.env.VITE_IC_HOST,
    });
    const actor = createActor(import.meta.env.VITE_CANISTER_ID_ICPOS_BACKEND, {
      agent,
    });
    setBackend(actor);
  }, [isAuthenticated, authClient, hasLoggedIn, identity]);

  React.useEffect(() => {
    if (!backend) return;
    backend.get().then((response) => {
      if (response.status === 200) {
        setMerchantState({
          initialized: true,
          merchant: response.data[0],
        });
        return;
      }
      setMerchantState({
        initialized: true,
        merchant: undefined,
      });
    });
  }, [backend, setMerchantState]);

  const updateMerchant = async (merchant: Merchant) => {
    if (!backend) return;
    const response = await backend.update(merchant);
    if (response.status === 200) {
      setMerchantState({
        initialized: true,
        merchant: response.data[0],
      });
    }
    return response;
  };

  return { merchantState, updateMerchant };
}
