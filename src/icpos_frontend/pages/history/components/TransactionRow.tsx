import { Transaction } from "../../../icrc/types/transaction.type";
import { formatCkBtc } from "../../../utils/formatCkBtc";
import { shortenPrincipal } from "../../../utils/shortenPrincipal";
import { useAuth } from "../../../auth/hooks/useAuth";

export default function TransactionRow({
  transaction,
}: {
  transaction: Transaction;
}) {
  const { identity } = useAuth();
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const principal =
    params.get("principal") || identity?.getPrincipal().toString() || "";

  const amount = transaction.amount;

  const displayDate = new Date(Number(transaction.timestamp) / 1e6)
    .toISOString()
    .slice(0, 10);

  const plusOrMinus =
    transaction.from_owner.toString() === principal ? "-" : "+";

  return (
    <div className="flex flex-row items-center justify-between w-full p-5">
      <div>
        <div className="text-[0.8rem]">{displayDate}</div>
        {transaction.from_owner.toString() === principal ? (
          <div>To: {shortenPrincipal(transaction.to_owner)}</div>
        ) : (
          <div>From: {shortenPrincipal(transaction.from_owner)}</div>
        )}
      </div>
      <div className="text-[1.4rem]">
        {plusOrMinus}
        {formatCkBtc(amount)}
      </div>
    </div>
  );
}
