import { Transaction } from "../../../icrc/transactions";
import { shortenPrincipal } from "../../../utils/shorten-principal";
import { useAuth } from "../../../auth/hooks/useAuth";

export default function TransactionRow({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { identity } = useAuth();
  if (!identity) return null;

  //const principal = identity.getPrincipal().toString();
  const principal =
    "237zc-vao7e-qxrtp-dampy-4rqvq-3eg3b-elvly-q2xnl-jqlpj-d2jpt-xqe";
  const { from_account, amount, timestamp } = transaction;

  const displayAmount = from_account === principal ? "-" + amount : amount;
  const displayDate = new Date(timestamp / 1e6).toISOString().slice(0, 10);
  const displayFromAccount = shortenPrincipal(from_account);

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div>
        <div className="text-[0.8rem]">{displayDate}</div>
        <div>{displayFromAccount}</div>
      </div>
      <div className="text-[1.4rem]">{displayAmount}</div>
    </div>
  );
}
