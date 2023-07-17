// Importing base modules
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Char "mo:base/Char";
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Trie "mo:base/Trie";
import TrieMap "mo:base/TrieMap";
import Buffer "mo:base/Buffer";

// Importing local modules
import MainTypes "main.types";
import CkBtcLedgerTypes "ckbtc-ledger/ckbtc-ledger.types";
import HttpTypes "http/http.types";

shared (actorContext) actor class Main(_startBlock : Nat) {

  private stable var merchantStore : Trie.Trie<Text, MainTypes.Merchant> = Trie.empty();
  private stable var latestTransactionIndex : Nat = 0;
  private stable var courierApiKey : Text = "";
  private var logData = Buffer.Buffer<Text>(0);

  // Local deployment of an ICRC ledger
  //private var LedgerActor = actor ("b77ix-eeaaa-aaaaa-qaada-cai") : CkBtcLedgerTypes.Actor;
  // ckBTC ICRC ledger on the Internet Computer
  private var LedgerActor = actor ("mxzaz-hqaaa-aaaar-qaada-cai") : CkBtcLedgerTypes.Actor;

  /**
    *  Get the merchant's information
    */
  public query (context) func get() : async MainTypes.Response<MainTypes.Merchant> {
    let caller : Principal = context.caller;

    switch (Trie.get(merchantStore, merchantKey(Principal.toText(caller)), Text.equal)) {
      case (?merchant) {
        {
          status = 200;
          status_text = "OK";
          data = ?merchant;
          error_text = null;
        };
      };
      case null {
        {
          status = 404;
          status_text = "Not Found";
          data = null;
          error_text = ?("Merchant with principal ID: " # Principal.toText(caller) # " not found.");
        };
      };
    };
  };

  /**
    * Update the merchant's information
    */
  public shared (context) func update(merchant : MainTypes.Merchant) : async MainTypes.Response<MainTypes.Merchant> {

    let caller : Principal = context.caller;
    merchantStore := Trie.replace(
      merchantStore,
      merchantKey(Principal.toText(caller)),
      Text.equal,
      ?merchant,
    ).0;
    {
      status = 200;
      status_text = "OK";
      data = ?merchant;
      error_text = null;
    };
  };

  /**
    * Set the courier API key. Only the owner can set the courier API key.
    */
  public shared (context) func setCourierApiKey(newKey : Text) : async MainTypes.Response<Text> {
    if (not Principal.equal(context.caller, actorContext.caller)) {
      return {
        status = 403;
        status_text = "Forbidden";
        data = null;
        error_text = ?"Only the owner can set the courier API key.";
      };
    };
    courierApiKey := newKey;
    {
      status = 200;
      status_text = "OK";
      data = ?courierApiKey;
      error_text = null;
    };
  };

  /**
  * Get latest log items. Log output is capped at 100 items.
  */
  public query func getLogs() : async [Text] {
    Buffer.toArray(logData);
  };

  /**
    * Log a message. Log output is capped at 100 items.
    */
  private func log(text : Text) {
    Debug.print(text);
    logData.reserve(logData.size() + 1);
    logData.insert(0, text);
    // Cap the log at 100 items
    if (logData.size() == 100) {
      let x = logData.removeLast();
    };
    return;
  };

  /**
    * Generate a Trie key based on a merchant's principal ID
    */
  private func merchantKey(x : Text) : Trie.Key<Text> {
    return { hash = Text.hash(x); key = x };
  };

  /**
    * Check for new transactions and notify the merchant if a new transaction is found.
    * This function is called by the global timer.
    */

  // Background notifiations currently disabled as IC requires external https endpoints
  // to support IPv6. This is not currently supported by Courier (or any other service
  // I could find).

  // system func timer(setGlobalTimer : Nat64 -> ()) : async () {
  //   let next = Nat64.fromIntWrap(Time.now()) + 20_000_000_000; // 20 seconds
  //   setGlobalTimer(next);
  //   await notify();
  // };

  /**
    * Notify the merchant if a new transaction is found.
    */
  private func notify() : async () {
    var start : Nat = _startBlock;
    if (latestTransactionIndex > 0) {
      start := latestTransactionIndex + 1;
    };

    var response = await LedgerActor.get_transactions({
      start = start;
      length = 1;
    });

    if (Array.size(response.transactions) > 0) {
      latestTransactionIndex := start;

      if (response.transactions[0].kind == "transfer") {
        let t = response.transactions[0];
        switch (t.transfer) {
          case (?transfer) {
            let to = transfer.to.owner;
            switch (Trie.get(merchantStore, merchantKey(Principal.toText(to)), Text.equal)) {
              case (?merchant) {
                if (merchant.email_notifications) {
                  log("Sending email to: " # debug_show (merchant.email_address));
                  await sendEmail(merchant, t);
                };
                if (merchant.phone_notifications) {
                  log("Sending text to: " # debug_show (merchant.phone_number));
                  //TODO: Implement HTTP outcall to send text
                };
              };
              case null {
                // No action required if merchant not found
              };
            };
          };
          case null {
            // No action required if transfer is null
          };
        };
      };
    };
  };

  /**
    * Send an email to a merchant about a received payment
    */
  private func sendEmail(merchant : MainTypes.Merchant, transaction : CkBtcLedgerTypes.Transaction) : async () {
    //1. DECLARE IC MANAGEMENT CANISTER
    let ic : HttpTypes.IC = actor ("aaaaa-aa");

    //2. SETUP ARGUMENTS FOR HTTP GET request
    let idempotencyKey : Text = Text.concat(merchant.name, Nat64.toText(transaction.timestamp));
    let requestHeaders = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Idempotency-Key"; value = idempotencyKey },
      {
        name = "Authorization";
        value = "Bearer " # courierApiKey;
      },
    ];

    var amount = "0";
    var from = "";
    switch (transaction.transfer) {
      case (?transfer) {
        amount := Nat.toText(transfer.amount);
        from := Principal.toText(transfer.from.owner);
      };
      case null {};
    };

    let requestBodyJson : Text = "{\"message\": {\"to\": { \"email\": \"" # merchant.email_address # "\"}, \"template\": \"WJKFSV1362MGZEHW9G7EMMPZDMMW\", \"data\": {\"amount\": \"" # amount # "\", \"payer\": \"" # from # "\"}}}";
    let requestBodyAsBlob : Blob = Text.encodeUtf8(requestBodyJson);
    let requestBodyAsNat8 : [Nat8] = Blob.toArray(requestBodyAsBlob);

    // 2.3 The HTTP request
    let httpRequest : HttpTypes.HttpRequestArgs = {
      url = "https://api.courier.com/send";
      max_response_bytes = ?Nat64.fromNat(1000);
      headers = requestHeaders;
      body = ?requestBodyAsNat8;
      method = #post;
      transform = null;
    };

    //3. ADD CYCLES TO PAY FOR HTTP REQUEST
    // 49.14M + 5200 * request_size + 10400 * max_response_bytes
    // 49.14M + (5200 * 1000) + (10400 * 1000) = 64.74M
    Cycles.add(70_000_000);

    //4. MAKE HTTPS REQUEST AND WAIT FOR RESPONSE
    let httpResponse : HttpTypes.HttpResponsePayload = await ic.http_request(httpRequest);

    if (httpResponse.status > 299) {
      log("Error sending email");
    } else {
      log("Email sent");
    };
  };

  system func postupgrade() {
    // Make sure we start to montitor transactions from the block set on deployment
    latestTransactionIndex := _startBlock;
  };
};
