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

// Importing ledger types
import CkBtcLedgerTypes "ckbtc-ledger/ckbtc-ledger.types";

actor class Main(_startBlock : Nat) {

  type Merchant = {
    name : Text;
    email_notifications : Bool;
    email_address : Text;
    phone_notifications : Bool;
    phone_number : Text;
  };

  type Response = {
    status : Nat16;
    status_text : Text;
    data : ?Merchant;
    error_text : ?Text;
  };

  private stable var merchantStore : Trie.Trie<Text, Merchant> = Trie.empty();
  private stable var latestTransactionIndex : Nat = 0;

  // Local deployment of an ICRC ledger
  // private var LedgerActor = actor ("b77ix-eeaaa-aaaaa-qaada-cai") : CkBtcLedgerTypes.Actor;
  // ckBTC ICRC ledger on the Internet Computer
  private var LedgerActor = actor ("mxzaz-hqaaa-aaaar-qaada-cai") : CkBtcLedgerTypes.Actor;

  // Function to get the merchant's information
  public shared query (msg) func get() : async Response {
    let caller : Principal = msg.caller;

    switch (Trie.get(merchantStore, key(Principal.toText(caller)), Text.equal)) {
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

  // Function to update the merchant's information
  public shared (msg) func update(merchant : Merchant) : async Response {
    let caller : Principal = msg.caller;
    merchantStore := Trie.replace(
      merchantStore,
      key(Principal.toText(caller)),
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

  private func key(x : Text) : Trie.Key<Text> {
    return { hash = Text.hash(x); key = x };
  };

  // Function to check for new transactions and notify the merchant
  private func notify() : async Null {
    var start : Nat = _startBlock;
    if (latestTransactionIndex > 0) {
      start := latestTransactionIndex + 1;
    };

    var response = await LedgerActor.get_transactions({
      start = start;
      length = 1;
    });

    let t = response.transactions[0];
    if (t.kind == "mint") {
      switch (t.mint) {
        case (?mint) {
          let to = mint.to.owner;
          switch (Trie.get(merchantStore, key(Principal.toText(to)), Text.equal)) {
            case (?merchant) {
              if (merchant.email_notifications) {
                Debug.print("Sending email to: " # debug_show (merchant.email_address));
                //TODO: Implement HTTP outcall to send email
              };
              if (merchant.phone_notifications) {
                Debug.print("Sending text to: " # debug_show (merchant.phone_number));
                //TODO: Implement HTTP outcall to send text
              };
            };
            case null {
              // No action required if merchant not found
            };
          };
        };
        case null {
          // No action required if mint is null
        };
      };
    };

    latestTransactionIndex := start;
    return null;
  };

  // Function to set a global timer to call `notify` every 20 seconds
  system func timer(setGlobalTimer : Nat64 -> ()) : async () {
    let next = Nat64.fromIntWrap(Time.now()) + 20_000_000_000; // 20 seconds
    setGlobalTimer(next);
    let response = await notify();
  };
};
