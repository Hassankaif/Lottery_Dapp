import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const navigate = useNavigate();

  // Function to connect wallet
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        console.log("Connected account:", accounts[0]);
        navigate("/pick-winner"); // Navigate to the Pickwinner page
      } catch (err) {
        console.error("Error connecting to MetaMask:", err);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("MetaMask not detected! Please install MetaMask.");
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setCurrentAccount(null); // Clear the connected account
    navigate("/"); // Return to the home page
    console.log("Wallet disconnected");
  };

  // Automatically update account when MetaMask account changes
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setCurrentAccount(null); // No accounts connected
        } else {
          setCurrentAccount(accounts[0]); // Update to new account
        }
      });
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Lottery DApp</h1>
      {!currentAccount ? (
        <button onClick={connectWallet} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected Account: {currentAccount}</p>
          <button onClick={disconnectWallet} style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px" }}>
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
