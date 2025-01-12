import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
        navigate("/pick-winner");
      } catch (err) {
        console.error("Error connecting to MetaMask:", err);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
    navigate("/");
    console.log("Wallet disconnected");
  };

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setCurrentAccount(null);
        } else {
          setCurrentAccount(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="text-center">
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-md">
              <img
                src="/Lottery.png"
                alt="Lottery"
                className="w-fit h-[200px] object-cover"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Lottery DApp</h1>
          <p className="text-gray-600 mb-6">
            Connect your wallet to participate in the lottery and stand a chance to win exciting prizes.
          </p>
          {!currentAccount ? (
            <button
              onClick={connectWallet}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-lg font-medium shadow-md transition-transform transform hover:scale-105"
            >
              Connect Wallet
            </button>
          ) : (
            <div>
              <p className="text-lg text-gray-800 mb-4">
                Connected Account: <span className="font-semibold">{currentAccount}</span>
              </p>
              <button
                onClick={disconnectWallet}
                className="px-8 py-3 bg-red-500 hover:bg-red-400 text-white rounded-lg text-lg font-medium shadow-md transition-transform transform hover:scale-105"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
