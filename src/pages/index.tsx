import * as React from "react";
import { toast } from "react-toastify";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const Home = () => {
  const wallet = useWallet();


  return (
    <main className="min-h-screen  text-white">
      <div>
        <div className="grid place-content-center p-[100px]">
          <div
            style={{
              borderWidth: "4px",
              borderImage: "linear-gradient(to right, #4F46E5, #8F4AFE) 1",
              borderColor: "transparent",
            }}
            className="w-[300px]  sm:w-[600px] h-[400px] border-4"
          >
            <div 
               
            >
              {wallet.connected ? (
                <h1 className="text-center text-2xl pt-[50px]">
                   Check your wallet for spare solana
                </h1>
              ) : (
                <h1 className="pt-[50px] text-center text-2xl">
                  Connect to wallet
                </h1>
              )}
             
            </div>

            <div className="grid place-content-center pt-[200px] bg-[#512da8] ">
              <WalletMultiButton className="rounded-sm bg-[#512da8] " />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
