import { Merchant, _SERVICE } from "../../../../declarations/icpos/icpos.did";

import { ActorSubclass } from "@dfinity/agent";
import { MerchantState } from "../state/merchant.state";
import React from "react";
import { createActor } from "../../../../declarations/icpos";
import { useAuth } from "../../../auth/hooks/useAuth";
import { useRecoilState } from "recoil";

export function useIcPos() {
  const { isAuthenticated, authClient, hasLoggedIn, identity, agent } =
    useAuth();
  const [backend, setBackend] = React.useState<ActorSubclass<_SERVICE> | null>(
    null
  );
  const [merchantState, setMerchantState] = useRecoilState(MerchantState);

  React.useEffect(() => {
    if (!isAuthenticated || !authClient || !hasLoggedIn || !agent) return;
    const actor = createActor(import.meta.env.VITE_CANISTER_ID_ICPOS, {
      agent,
    });
    setBackend(actor);
  }, [isAuthenticated, authClient, hasLoggedIn, identity, agent]);

  React.useEffect(() => {
    if (!backend) return;
    backend.getMerchant().then((response) => {
      if (response.status === 200) {
        if (!response.data) return;
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
    const response = await backend.updateMerchant(merchant);
    if (response.status === 200) {
      if (!response.data) return;
      setMerchantState({
        initialized: true,
        merchant: response.data[0],
      });
    }
    return response;
  };

  return { merchantState, updateMerchant };
}
