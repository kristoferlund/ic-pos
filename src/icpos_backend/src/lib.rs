use ic_cdk::export::{
    candid::{CandidType, Deserialize},
    Principal,
};
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::BTreeMap;

type MerchantStore = BTreeMap<Principal, Merchant>;

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
struct Merchant {
    pub name: String,
    pub email_notifications: bool,
    pub email_address: String,
    pub phone_notifications: bool,
    pub phone_number: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
struct Response {
    status: u16,
    status_text: String,
    data: Option<Merchant>,
    error_text: Option<String>,
}

thread_local! {
    static MERCHANT_STORE: RefCell<MerchantStore> = RefCell::default();
}

#[query]
fn get() -> Response {
    let id = ic_cdk::api::caller();
    MERCHANT_STORE.with(
        |merchant_store| match merchant_store.borrow().get(&id).cloned() {
            Some(merchant) => Response {
                status: 200,
                status_text: "OK".to_string(),
                data: Some(merchant),
                error_text: None,
            },
            None => Response {
                status: 404,
                status_text: "Not Found".to_string(),
                data: None,
                error_text: Some("Merchant not found.".to_string()),
            },
        },
    )
}

#[update]
fn update(merchant: Merchant) -> Response {
    let id = ic_cdk::api::caller();
    MERCHANT_STORE.with(|merchant_store| {
        let mut merchant_store = merchant_store.borrow_mut();
        merchant_store.insert(id, merchant.clone());
        Response {
            status: 200,
            status_text: "OK".to_string(),
            data: Some(merchant),
            error_text: None,
        }
    })
}
