
import { Account, AccountAddress, Aptos, AptosConfig, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";
import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clear } from "../redux/Slices/CartSlice";
import {useWallet} from "./WalletProvider"
import { AptosClient, AptosAccount, TransactionBuilder} from "aptos";

const CheckOut = () => {
  const { account, isConnected } = useWallet();
  const [product, setProduct] = useState(null); // Assume you have product details from cart

  window.Buffer = Buffer;
  const APTOS_NETWORK =Network.DEVNET;
  const [toPublicKey, setToPublicKey] = useState(
    "0x957ed76d98b6750382383acdccc85407ba9cb9e8617d581cfda83a13822aa7e0"
  );
  const [amount, setAmount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const { cart } = useSelector((state) => state);

  useEffect(() => {
    getItem();
  }, [cart]);

  const getItem = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_LOCALHOST}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
     
      });
      console.log("cart-->",cart);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log(data);
      const total = data.orders.reduce((acc, curr) => acc + curr.price, 0);

      // setAmount(total); // Set the total amount directly
      setAmount(Math.round(total));
    } catch (error) {
      console.error("Failed to fetch items:", error);
      setStatusMessage("Failed to fetch items from cart.");
    }
  };

  
    // Function to handle purchase
    const handlePurchase = async (price) => {
      if (!account || !account.address) {
          alert("Please connect your wallet.");
          return;
      }
      try {
          const transactionPayload = {
            type: "entry_function_payload",
              function: "0x957ed76d98b6750382383acdccc85407ba9cb9e8617d581cfda83a13822aa7e0::ShoppingDApp::Marketplace.purchase",
              type_arguments: [],
              arguments: [
                  "0x0b1495c33cb9d0de292ad1b27cf37ee3c968006aba1d11209566fb7eeef9eb2d",  // Replace with the seller's address
                  account.address,           // Buyer’s address (connected wallet)
                  BigInt(price * 100000000),          // Amount in APT to be transferred
                
              ]
          };
        // Build the transaction using the appropriate client method
        const aptosClient = new AptosClient("https://fullnode.devnet.aptoslabs.com");
        console.log("payload",transactionPayload)
        const transaction = {
          
            sender: account.address,  // Set the sender's address directly
            payload: transactionPayload,
            gas_unit_price: 100,  // Adjust gas unit price as needed
            max_gas_amount: 10000  // Adjust max gas amount as needed
        };

        // Sign and submit the transaction
        const response = await aptosClient.submitTransaction(account, transaction);

        // Wait for transaction confirmation
        const transactionStatus = await aptosClient.waitForTransaction(response.hash);

        if (transactionStatus.success) {
            alert("Transaction successful!");
        } else {
            alert("Transaction failed. Please try again.");
        }
    } catch (error) {
        console.error("Error making the transaction", error);
        alert("Transaction failed. Please try again.");
    }
};
  


  return (
    <div>
              <div>
            {isConnected ? (
                <div>
                    <h2>{}</h2>
                    <p>Price: {amount} APT</p>
                    <button onClick={() => handlePurchase(amount)}>
                        Purchase Product
                    </button>
                </div>
            ) : (
                <p>Please connect your wallet to proceed.</p>
            )}
        </div>
{/*  
      <div className="flex flex-col gap-4 w-2/5 mx-auto  border-green-700 border-y-4 rounded-lg p-4 mt-12 bg-slate-100 shadow-2xl">
        <h1 className="text-3xl font-semibold text-center mb-4 mt-2">
          Make Payment
        </h1>
        <input
          type="text"
          placeholder="Receiver's Address"
          className="border border-green-600 rounded-lg h-10 px-4"
          readOnly
          value={toPublicKey}
        />
        <input
          type="text"
          readOnly
          value={amount}
          placeholder="Amount"
          className="border border-green-600 rounded-lg h-10 px-4"
        />
        <button
          className="rounded-lg h-12 px-2 bg-green-700 hover:bg-green-700 disabled:bg-green-300"
          onClick={() => sendTokens(toPublicKey)} 
          disabled={!wallet.connected || loading}
        >
          {loading ? "Sending..." : "Send Solana"}
        </button>

        {statusMessage && <p className="mt-2 text-center">{statusMessage}</p>}
        {!wallet.connected && (
          <Link
            to="/wallet"
            replace={true}
            className="rounded-lg h-12 px-2 bg-[#512da8] hover:bg-green-700 flex justify-center items-center"
          >
            Connect Wallet
          </Link>
        )}
      </div> */}
      {/* <div>
        {transactionHistory && (
          <div className="flex justify-between flex-col items-center mt-12 border border-green-700 font-semibold w-11/12 mx-auto border-x-0 border-y-2">
            <p className="text-2xl mt-2 font-bold">Transaction Details are:</p>
            <div className="flex justify-between items-center w-full mt-4">
              <div>Sender :</div>
              <div className="text-blue-900 font-bold">
                {transactionHistory.sender}
              </div>
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <div>Reciver :</div>
              <div className="text-blue-900 font-bold">
                {transactionHistory.receiver}
              </div>
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <div>Signature :</div>
              <div className="text-blue-900 font-bold">
                {transactionHistory.signature}
              </div>
            </div>
            <div className="flex justify-between items-center w-full mt-4">
              <div>PriceInSOL :</div>
              <div className="text-blue-900 font-bold text-xl">
                {transactionHistory.priceInSol}
              </div>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default CheckOut;