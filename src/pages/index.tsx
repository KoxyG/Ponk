import * as React from "react";
import { toast } from "react-toastify";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import VideoBg from "../assets/videos/videobg.mp4";
import Image from "next/image";

const Home = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const [balance, setBalance] = React.useState<number>(0);

  const getInfo = async () => {
    if (connection && wallet.publicKey) {
      // we get the account info for the user's wallet data store and set the balance in our application's state
      const info = await connection.getAccountInfo(wallet.publicKey);
      setBalance(info!.lamports / web3.LAMPORTS_PER_SOL);
    }
  };

  return (
    <main className="min-h-screen  text-white">
      <div>
        <div className="">
          <video
            className="relative w-full h-screen object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={VideoBg} type="video/mp4" />
          </video>

          <div className="absolute inset-0  grid place-content-center p-[100px]">
            <div
              style={{
                borderWidth: "4px",
                borderStyle: "solid",
                borderImage: "linear-gradient(to right, #923ef2, #8F4AFE) 1",
                borderColor: "transparent",
                borderRadius: "50%",
              }}
              className="w-[300px] rounded-md sm:w-[600px] h-[400px]"
            >
              <div>
                {wallet.connected ? (
                  <div className="grid sm:w-[600px]">

                    <div className="grid place-content-end pt-6 pr-6">
                      <button className="bg-gradient-to-r from-[#27d6ab] to-[#cd32fc] rounded-md  sm:px-[3px] sm:py-[3px]">
                        <WalletMultiButton className="rounded-sm bg-[#512da8] " />
                      </button>
                    </div>

                    <div className="grid place-content-center">
                    <button
                      onClick={getInfo}
                      style={{ opacity: balance > 0 ? 0.5 : 1 }}
                      disabled={balance > 0}
                      className="text-center bg-gradient-to-r from-[#923ef2] to-[#8F4AFE] hover:from-[#27d6ab] hover:to-[#cd32fc] rounded-md px-3 py-2 sm:text-2xl mt-[50px]"
                    >
                      Check for spare solana
                    </button>
                    </div>

                    {balance ? (
                      <p className="text-white text-center mt-3 italic font-semibold">
                        Your balance is {balance} sol
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div>
                    <h1 className="pt-[50px] text-center text-2xl">
                      Connect your wallet
                    </h1>

                    <div className="grid place-content-center pt-[200px] ">
                      <button className="bg-gradient-to-r from-[#27d6ab] to-[#cd32fc] rounded-md sm:px-[3px] sm:py-[3px]">
                        <WalletMultiButton className="rounded-sm bg-[#512da8] " />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <Image
            className="h-screen"
            src="/img.png"
            alt="image"
            width={1000}
            height={1000}
          /> */}
        </div>
      </div>
    </main>
  );
};

export default Home;
