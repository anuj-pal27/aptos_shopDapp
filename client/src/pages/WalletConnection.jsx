// src/components/WalletConnection.js

import React from "react";
import { useWallet } from "./WalletProvider";
import { useState } from "react";
import { Account, AccountAddress, Aptos, AptosConfig, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

const WalletConnection = () => {
    const { connectWallet, disconnectWallet, requestAirdrop,account, isConnected } =  useWallet();

    window.Buffer = Buffer;
    const APTOS_NETWORK =Network.DEVNET;
    const config = new AptosConfig({ network: APTOS_NETWORK });
    const aptos = new Aptos(config);

  const [showbalance, setShowbalance] = useState("");

    const balance = async (name, accountAddress, versionToWaitFor) => {
        console.log("account address-->",account.address);
        const amount = await aptos.getAccountAPTAmount({
          accountAddress,
          minimumLedgerVersion: versionToWaitFor,
        });
    
        console.log(`${name}'s balance is: ${amount}`);
        return amount;
      };

    async function handleShowBalance(){
        // Show the balances
        console.log("\n=== Initial Balances ===\n");
        const totalBalance = await balance("User", account.address);
        setShowbalance(totalBalance);
      }

    return (
        <div>
            {isConnected ? (
                <>
                    <p>Connected to Aptos wallet</p>
                    <p>Account Address: {account.address}</p>
                    <button onClick={disconnectWallet} className="border-4">Disconnect Wallet</button>
                    <div>
                    <button onClick={requestAirdrop} className="border-4">Airdrop 1000 Tokens</button></div>
                    <div>
        <button onClick={handleShowBalance}>Show Balance</button>
        <h2>{showbalance}</h2>
      </div>
                </>
            ) : (
                <button onClick={connectWallet} className="border-4">Connect Aptos Wallet</button>
                
            )}
        </div>
    );
};

export default WalletConnection;
