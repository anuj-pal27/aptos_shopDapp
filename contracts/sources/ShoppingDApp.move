module ShoppingDApp::Marketplace {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    // Event structure to store purchase details
    struct PurchaseEvent has copy, drop, store {
        buyer: address,
        seller: address,
        amount: u64,
    }

    // Marketplace structure to hold the latest purchase
    struct Marketplace has key {
        last_purchase: PurchaseEvent,
    }

    // Initialize the marketplace by setting a placeholder purchase event
    public fun init_marketplace(account: &signer) {
        move_to(account, Marketplace {
            last_purchase: PurchaseEvent {
                buyer: signer::address_of(account),
                seller: @0x0, // Placeholder seller address
                amount: 0,
            },
        });
    }

    // Purchase function to transfer Aptos coins and record the last purchase
    public fun purchase(
        buyer: &signer,
        seller: address,
        amount: u64
    ) acquires Marketplace {
        // Transfer Aptos coins from buyer to seller
        coin::transfer<AptosCoin>(buyer, seller, amount);

        // Record the last purchase event in the Marketplace resource
        let marketplace = borrow_global_mut<Marketplace>(signer::address_of(buyer));
        marketplace.last_purchase = PurchaseEvent {
            buyer: signer::address_of(buyer),
            seller,
            amount,
        };
    }
}

