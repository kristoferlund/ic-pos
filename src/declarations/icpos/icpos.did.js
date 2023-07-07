export const idlFactory = ({ IDL }) => {
  const Merchant = IDL.Record({
    email_address: IDL.Text,
    phone_notifications: IDL.Bool,
    name: IDL.Text,
    email_notifications: IDL.Bool,
    phone_number: IDL.Text,
  });
  const Response = IDL.Record({
    status: IDL.Nat16,
    data: IDL.Opt(Merchant),
    status_text: IDL.Text,
    error_text: IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    get: IDL.Func([], [Response], ["query"]),
    update: IDL.Func([Merchant], [Response], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
