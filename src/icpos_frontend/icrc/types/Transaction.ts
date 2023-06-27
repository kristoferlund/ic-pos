export type Transaction = {
  ledger_canister_id: string;
  from_subaccount: string;
  created_at_time: string | null;
  index: number;
  from_account: string;
  timestamp: number;
  block_hash: string | null;
  to_owner: string;
  fee_collector_block: string | null;
  block_phash: string | null;
  to_subaccount: string;
  updated_at: string;
  transaction_hash: string | null;
  to_account: string;
  raw: Record<string, unknown>; // The type of this can be modified as per the actual data
  kind: string;
  memo: string | null;
  amount: number;
  fee: number;
  from_owner: string;
};
