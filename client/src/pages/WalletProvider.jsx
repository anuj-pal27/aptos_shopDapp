// import { useState } from "react";
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from "@solana/wallet-adapter-react";
// import {
//   WalletModalProvider,
//   WalletDisconnectButton,
//   WalletMultiButton,
// } from "@solana/wallet-adapter-react-ui";
// import "@solana/wallet-adapter-react-ui/styles.css";
// import AirdropPage from "../components/AirdropPage";
// import SignMessage from "../components/SignMessage";

// function Wallet() {
//   const [section, setSection] = useState("airdrop");

//   const handleSectionChange = (section) => {
//     setSection(section);
//   };

//   return (
//     <>
//       <ConnectionProvider
//         endpoint={
//           "https://solana-devnet.g.alchemy.com/v2/SfymCb3jHNtavsH0Ht_x4nF75gbUnPrM"
//         }
//         autoConnect
//       >
//         <div className="md:w-1/2 w-11/12 mx-auto p-6 my-[10vh] rounded-lg border-y-4 border-green-400 bg-white">
//           <WalletProvider wallets={[]} autoConnect>
//             <WalletModalProvider>
//               <div className="flex justify-center gap-8">
//                 <WalletMultiButton />
//                 <WalletDisconnectButton />
//               </div>
//               <div className="flex justify-between my-8 px-8">
//                 <button
//                   className={`h-10 rounded-lg font-semibold w-1/4 border border-black/30 ${
//                     section === "airdrop" ? "bg-green-700" : "bg-green-200"
//                   } hover:bg-green-700`}
//                   onClick={() => handleSectionChange("airdrop")}
//                 >
//                   AirDrop
//                 </button>
//                 <button
//                   className={`h-10 rounded-lg font-semibold w-1/4 border border-black/30 ${
//                     section === "verify" ? "bg-green-700" : "bg-green-200"
//                   }`}
//                   onClick={() => handleSectionChange("verify")}
//                 >
//                   Verify Message
//                 </button>
//               </div>
//               <div className="">
//                 {section === "airdrop" && <AirdropPage />}
//                 {section === "verify" && <SignMessage />}
//               </div>
//             </WalletModalProvider>
//           </WalletProvider>
//         </div>
//       </ConnectionProvider>
//     </>
//   );
// }

// export default Wallet;
// src/contexts/WalletProvider.js
// src/contexts/WalletProvider.js

import React, { createContext, useContext, useState } from "react";
import { AptosClient, FaucetClient} from "aptos";

// Create a context
const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    // Initialize Aptos Client and Faucet Client
const NODE_URL = "https://fullnode.devnet.aptoslabs.com/v1";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";
    const client = new AptosClient("https://fullnode.devnet.aptoslabs.com/v1");
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

    const connectWallet = async () => {
        try {
            // Check if Martian Wallet extension is available
            if (window.martian && typeof window.martian.connect === 'function') {
                const accountInfo = await window.martian.connect();
                setAccount(accountInfo);
                setIsConnected(true);
                console.log("Connected to wallet:", accountInfo);
            } else {
                console.error("Martian Wallet extension not found or connect method unavailable.");
            }
        } catch (error) {
            console.error("Wallet connection failed:", error);
        }
    };

    const disconnectWallet = async () => {
        if (window.martian && typeof window.martian.disconnect === 'function') {
            await window.martian.disconnect();
            setAccount(null);
            setIsConnected(false);
        } else {
            console.error("Martian Wallet disconnect method unavailable.");
        }
    };
    const requestAirdrop = async () => {
        try {
            if (account?.address) {
                // Request an airdrop of 1000 test tokens to the connected wallet address
                // console.log(account)
                await faucetClient.fundAccount(account.address, 100000000000);
                console.log(`Airdropped 1000 tokens to ${account.address}`);
            } else {
                console.error("Wallet is not connected.");
            }
        } catch (error) {
            console.error("Airdrop failed:", error);
        }
    };

    return (
        <WalletContext.Provider
            value={{
                account,
                isConnected,
                connectWallet,
                disconnectWallet,
                requestAirdrop,
                client,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);

