import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import LotteryABI from "../../build/contracts/Lottery.json";

const Pickwinner = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [lotteryContract, setLotteryContract] = useState(null);
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("0");
  const contractAddress = "0xF8b9FEf452Aa9ae6Ee07c77Ddf47f6AFC31db037";
  const playerr=['John', 'Kaif', 'Alice'];

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setCurrentAccount(address);

        const contract = new ethers.Contract(contractAddress, LotteryABI.abi, signer);
        setLotteryContract(contract);
      } else {
        alert("MetaMask not detected!");
      }
    };
    loadBlockchainData();
  }, []);

  const participate = async () => {
    if (lotteryContract) {
      try {
        const tx = await lotteryContract.participate({ value: ethers.utils.parseEther("1") });
        await tx.wait();
        alert("You have successfully participated!");
      } catch (err) {
        console.error(err);
        alert("Error participating in the lottery");
      }
    }
  };

  const fetchPlayers = async () => {
    if (lotteryContract) {
      try {
        const players = await lotteryContract.getPlayers();
        setPlayers(players);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const fetchBalance = async () => {
    if (lotteryContract) {
      try {
        const balance = await lotteryContract.getBalance();
        setBalance(ethers.utils.formatEther(balance));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const pickWinner = async () => {
    if (lotteryContract) {
      try {
        const tx = await lotteryContract.pickWinner();
        await tx.wait();
        alert("Winner has been picked!");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="w-1/2">
            <div className="text-xl font-bold text-gray-800">Connected Account</div>
            <div className="text-lg text-blue-600 break-words">{currentAccount || "Not Connected"}</div>
          </div>
          <div className="w-1/2 text-center">
            <div className="text-xl font-bold text-gray-800">Lottery Balance</div>
            <div className="text-lg text-green-600">{balance} ETH</div>
          </div>
        </div>

        <div className="mb-6">
          {/* <div className="relative overflow-hidden rounded-none">
            <img
              src="/Lottery.png"
              alt="Lottery"
              className="w-full h-[200px] object-cover"
            />
          </div> */}
          <div className="grid grid-cols-4 gap-4 mt-4">
  {/* Participate Card */}
  <div className="bg-white shadow-md rounded-none overflow-hidden">
    <img
      src="/person.png"
      alt="Participate"
      className="w-full h-[800px] object-cover"
    />
    <div className="p-4">
      <button
        onClick={participate}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Participate
      </button>
    </div>
  </div>

  {/* Get Players Card */}
  <div className="bg-white shadow-md rounded-none overflow-hidden">
    <img
      src="/group2.webp"
      alt="Get Players"
      className="w-full h-[800px] object-cover"
    />
    <div className="p-4">
      <button
        onClick={fetchPlayers}
        className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
      >
        Get Players
      </button>
    </div>
  </div>

  {/* Get Balance Card */}
  <div className="bg-white shadow-md rounded-none overflow-hidden">
    <img
      src="/wallet.png"
      alt="Get Balance"
      className="w-full h-[800px] object-cover"
    />
    <div className="p-4">
      <button
        onClick={fetchBalance}
        className="w-full px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
      >
        Get Balance
      </button>
    </div>
  </div>

  {/* Pick Winner Card */}
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img
      src="/Crown Winner.png"
      alt="Pick Winner"
      className="w-full h-[800px] object-cover"
    />
    <div className="p-4">
      <button
        onClick={pickWinner}
        className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
      >
        Pick Winner
      </button>
    </div>
  </div>
</div>


          
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Players:</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-gray-700">#</th>
                  <th className="px-4 py-2 text-gray-700">Address</th>
                  <th className="px-4 py-2 text-gray-700">Nickname</th>
                </tr>
              </thead>
              <tbody>
                {players.length > 0 ? (
                  players.map((player, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{player}</td>
                      <td className="px-4 py-2"> {playerr[index]}</td> {/* Replace with nickname logic */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center px-4 py-2 text-gray-500">
                      No players found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pickwinner;
