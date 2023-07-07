import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface Merchant {
  email_address: string;
  phone_notifications: boolean;
  name: string;
  email_notifications: boolean;
  phone_number: string;
}
export type Principal = Uint8Array | number[];
export interface Response {
  status: number;
  data: [] | [Merchant];
  status_text: string;
  error_text: [] | [string];
}
export interface _SERVICE {
  get: ActorMethod<[], Response>;
  update: ActorMethod<[Merchant], Response>;
}
