![](./media/header.png)

# IC-POS

The Internet Computer [integrates directly with the Bitcoin network](https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/). This allows canisters on the Internet Computer to receive, hold, and send Bitcoin, all directly with transactions on the Bitcoin network. Chain-key Bitcoin (ckBTC) is an ICRC-1-compliant token that is backed 1:1 by Bitcoin held 100% on the IC mainnet. IC-POS is an experimental app to demonstrate a real world use case for ckBTC on the Internet Computer. It is a simple Point of Sale app that allows users to accept ckBTC payments.

For deeper understanding of the ICP < > BTC integration, see the IC wiki article on [Bitcoin integration](https://wiki.internetcomputer.org/wiki/Bitcoin_Integration).

## Features

- Users can login with their Internet Identity and configure a store.
- Display a QR code for customers to scan and pay. When a payment is received, the app will display a confirmation message.
- Payment notificactions as email/sms even when the app is not open. This uses the [HTTP Outcall](https://internetcomputer.org/docs/current/developer-docs/integrations/https-outcalls/) feature of the Internet Computer.
- Send ckBTC to other users.

## Try it!

EzPOS is deployed on the Internet Computer. You can try it out here:

https://hngac-6aaaa-aaaal-qb6tq-cai.icp0.io/

## Architecture

### Backend

The backend is written in Motoko and consist of one canister, `icpos`. It exposes two public methods:

- `get` - returns the store configuration for a given principal.
- `update` - updates the store configuration for a given principal.

In addition to the public methods, the canister uses a [timer](https://internetcomputer.org/docs/current/motoko/main/timers/) to monitor ledger transactions. When a new transaction is found that matches a configured store – depending on the store settings – the canister will send a notification either by email or SMS.

### Frontend

The frontend is written in Typescript/Vite/React/TailwindCSS. Users authenticate using the Internet Identity to access their store. The first time a user logs in, a store is created for them.

The frontend interacts with the following IC canisters:

- `icpos` - to fetch and update store configuration.
- `ckbtc ledger` - to send ckBTC to other users.
- `internet identity` - to authenticate users.

## Prerequisites

- [x] Install the [IC SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/index.mdx).

### Step 1: Start a local instance of the Internet Computer

```
dfx start --background
```

### Step 2: Deploy the backend canister:

```
dfx deploy icpos --argument '(0)'
```

The `--argument '(0)'` argument is used to initialize the canister with `startBlock` set to 0. This is used to tell the canister to start monitoring the ledger from block 0. When deploying to the IC mainnet, this should be set to the current block height to prevent the canister from processing old transactions.

### Step 3: Set Courier credentials

IC-POS uses [Courier](https://courier.com/) to send email and SMS notifications. You need to configure your Courier credentials in the `icpos` canister. You can do this by running the following command:

```
dfx canister --network local call icpos setCourierApiKey "pk_prod_..."
```

### Step 4: Build and run the frontend

```
yarn
yarn dev
```

The frontend is best run locally using yarn. Accessing the frontend through the local canister does not work at the moment due to lazy loading of modules. When deploying to ic mainnet this is not an issue.

## Not yet implemented

- **Email notifications and SMS notifications are not yet sent.** The logic needed to monitor the ledger canister for new transactions is implemented but the http outcalls are not yet completed due to time constraints. Will be added the week 17-21/07.
- **Sound notifications**. Forgot about that. Will be added the week 17-21/07.

## Notes

- Make sure you update the frontend environment variables in `src/.env` to match your local setup. Also update `vite.config.ts` to set the frontend canister id.
- Transactions are currently being fetched from the ICRC API. This is not ideal as there is some lag between the sending of a transaction and it being acknowledged by the API. We should instead be fetching them from the ckBTC canisters. This can be done for logged in users only as an autenticated `Agent` is required to interact with the canisters. I did create a hook to interact with the ledger canister directly, see `useCkBtcLedger.tsx`.
- I included the generated files in `src/declarations` to highlight the changes I made to the generated code. Vite does not support `process.env` so I had to manually replace it with `import.meta.env`.

## Possible Improvements

- Use `useCkBtcLedger` hook to fetch transactions instead of the ICRC API for logged in users.
- Login state is not persisted. Reloading the app will log the user out. This should be done using `localStorage` or `sessionStorage`.
- Show more information about transactions. A transaction detail page.
- Show a confirmation dialog after user clicks on `Send` button.

## Known issues

- Payment confirmations can be slow at times.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Author

- [kristofer@fmckl.se](mailto:kristofer@fmckl.se)
- Twitter: [@kristoferlund](https://twitter.com/kristoferlund)
- Discord: kristofer#1475

## License

[MIT](LICENSE)
