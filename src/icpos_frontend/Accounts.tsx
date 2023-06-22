import { AllAccounts } from "./api/accounts";
import { useRecoilValue } from "recoil";

export default function Accounts() {
  const accounts = useRecoilValue(AllAccounts);
  return (
    <div>
      <h1>Accounts</h1>
      <ul>
        {accounts &&
          accounts.map((account) => (
            <li key={account.owner}>{account.owner}</li>
          ))}
      </ul>
    </div>
  );
}
