import { useState, useEffect } from "react";

// Declare the ethereum property on window
declare global {
  interface Window {
    ethereum?: any;
  }
}

function WalletStatus () {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setIsWalletConnected(true);
          } else {
            setIsWalletConnected(false);
          }
        })
        .catch((error: any) => {
          console.error(error);
          setIsWalletConnected(false);
        });

      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setIsWalletConnected(true);
        } else {
          setIsWalletConnected(false);
        }
      });
    } else {
      setIsWalletConnected(false);
    }
  }, []);

  return (
    <div className={`flex items-center gap-2 px-4 border-2 rounded-full text-neutral-200 max-w-max
      ${isWalletConnected ? "border-green-600" : "border-yellow-500"}`}>
      <div
        className={`w-2 h-2 ${
          isWalletConnected ? "bg-green-600" : "bg-yellow-500"
        } rounded-full`}
      ></div>
      <span className="text-sm font-semibold">
        {isWalletConnected ? "Wallet deranged correctly" : "Wallet not deranged"}
      </span>
    </div>
  );
}

export default WalletStatus;
