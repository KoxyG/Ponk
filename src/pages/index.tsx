import * as React from "react";
import { toast } from "react-toastify";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import VideoBg from "../assets/videos/videobg.mp4"

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
          <video className="relative w-full h-screen object-cover"autoPlay
        loop
        muted
        playsInline >
            <source src={VideoBg} type="video/mp4" />
          </video>
          <div className="absolute inset-0  grid place-content-center p-[100px]">
            <div
              style={{
                borderWidth: "4px",
                borderStyle: "solid",
                borderImage: "linear-gradient(to right, #4F46E5, #8F4AFE) 1",
                borderColor: "transparent",
                borderRadius: "20%",
              }}
              className="w-[300px] rounded-md sm:w-[600px] h-[400px]"
            >
              <div>
                {wallet.connected ? (
                  <div className="grid place-content-center">
                    <button
                      onClick={getInfo}
                      style={{ opacity: balance > 0 ? 0.5 : 1 }}
                      disabled={balance > 0}
                      className="text-center border border-[#512da8] rounded-md px-3 py-2 text-2xl mt-[50px]"
                    >
                      Check your wallet
                    </button>

                    {balance ? (
                      <p className="text-white mt-3 italic font-semibold">
                        Your balance is {balance} sol
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <h1 className="pt-[50px] text-center text-2xl">
                    Connect your wallet
                  </h1>
                )}
              </div>

              <div className="grid place-content-center pt-[200px] ">
                <button className="bg-[#512da8] rounded-md px-[3px] py-[3px]">
                  <WalletMultiButton className="rounded-sm bg-[#512da8] " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
