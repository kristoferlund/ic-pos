import { Link } from "@tanstack/router";
import { TransactionWithId } from "@dfinity/ledger/dist/candid/icrc1_index";

import { shortenPrincipal } from "../../../utils/shortenPrincipal";
import { useAuth } from "../../../auth/hooks/useAuth";
import { formatCkBtc } from "../../../utils/formatCkBtc";

function UnsupportedTransaction() {
  return (
    <div className="flex flex-row items-center justify-between w-full p-5">
      <div>
        <div className="text-sm font-medium text-gray-900">
          Unsupported Transaction
        </div>
      </div>
    </div>
  );
}

export default function TransactionRow({
  transaction,
}: {
  transaction: TransactionWithId;
}) {
  const { identity } = useAuth();
  if (!identity) return null;

  const t = transaction.transaction;
  const tr = t.transfer;

  if (t.kind !== "transfer") return <UnsupportedTransaction />;

  const amount = tr[0]?.amount;

  const displayDate = new Date(Number(t.timestamp) / 1e6)
    .toISOString()
    .slice(0, 10);

  return (
    <Link
      to={"/transaction/$transactionId"}
      params={{
        transactionId: transaction.id.toString(),
      }}
      className="block w-full px-2 py-2 no-underline border-b border-gray-200 hover:bg-gray-100"
    >
      <div className="flex flex-row items-center justify-between w-full p-5">
        <div>
          <div className="text-[0.8rem]">{displayDate}</div>
          <div>{shortenPrincipal(tr[0]?.from.owner)}</div>
        </div>
        <div className="text-[1.4rem]">{formatCkBtc(amount)}</div>
      </div>
    </Link>
  );
}
