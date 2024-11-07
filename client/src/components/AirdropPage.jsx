// import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { useState, useEffect } from "react";
// import { PublicKey,Connection ,clusterApiUrl } from "@solana/web3.js";

const AirdropPage = () => {
  const wallet = useWallet();
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  // const { connection } = useConnection("https://solana-devnet.g.alchemy.com/v2/m3_KI26guxU63CyIdr05QA19iMBoV_XX","confirmed");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");

  
  // useEffect(() => {
  //   getBalance();
  // });

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      getBalance();
    }
  }, [wallet.connected, wallet.publicKey]); // Run when wallet connection state changes
  const getBalance = async () => {
    const balanceInSOL = await connection.getBalance(
      new PublicKey(wallet.publicKey)
    );
    setBalance(balanceInSOL / 10 ** 9);
  };

  const sendAirDropToUser =  () => {
 
   const response  =   connection.requestAirdrop(wallet.publicKey, amount * 10 ** 9).then((res)=>console.log(res)).
 catch((err)=>{console.log(err)})
  
    alert("Airdrop successful");
  };        <div>
          
  </div>

  const handleChange = async (event) => {
    setAmount(event.target.value);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-center my-8">
        Airdrop
      </h1>
      <div className="flex gap-1 my-4 justify-between">
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(event) => handleChange(event)}
          className="border border-gray-600 rounded-lg h-10 px-4 w-4/6"
        />
        <button
          className="rounded-lg h-10 px-2 bg-green-200 hover:bg-green-700 disabled:bg-slate-300"
          onClick={sendAirDropToUser}
          disabled={!amount}
        >
          Request Airdrop
        </button>
      </div>
      {wallet.connected ? (
        <div className="text-center font-semibold">
          <p className="">
            Connected to Wallet Address :{" "}
            <span className="text-[#512da8] ">
              {wallet.publicKey.toString()}
            </span>
          </p>
          Your Balance :{" "}
          <span className="text-[#512da8]">{balance} SOL</span>
        </div>
      ) : (
        <div className="text-center font-semibold">
          Connect your wallet
        </div>

      )}

    </>
  );
};

export default AirdropPage;
