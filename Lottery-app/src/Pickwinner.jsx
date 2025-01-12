import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import LotteryABI from "../../build/contracts/Lottery.json";
import Table from "./components/Table";
import Cards from "./components/Cards";
import VideoCard from "./components/VideoCard";

const Pickwinner = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [lotteryContract, setLotteryContract] = useState(null);
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("0");
  const [isWinnerPicked, setIsWinnerPicked] = useState(false);
  const [winner, setWinner] = useState(null);
  const [manager, setManager] = useState(null); // Add state to hold manager address
  const contractAddress = "0x5Aa3D98D3e511d086170aC3E35590B5524058098";

  useEffect(() => {
    const loadBlockchainData = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setCurrentAccount(address);

        const contract = new ethers.Contract(contractAddress, LotteryABI.abi, signer);
        setLotteryContract(contract);

        // Fetch manager's address
        const managerAddress = await contract.manager();
        setManager(managerAddress); // Set manager address
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
        console.log(players);
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
        setIsWinnerPicked(true);
        const winnerAddress = await lotteryContract.getWinner();
        setWinner(winnerAddress);
        alert("Winner has been picked!");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const transferPrize = async () => {
    if (lotteryContract) {
      try {
        const tx = await lotteryContract.transferPrize();
        await tx.wait();
        alert("Prize has been transferred to the winner!");
        setIsWinnerPicked(false);
        setPlayers([]); // Reset players after transferring the prize
      } catch (err) {
        console.error(err);
        alert("Error transferring the prize");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl"> {/* Increased max-width */}
          <div className="flex items-center justify-between mb-8"> {/* Increased margin-bottom */}
            <div className="w-1/2">
              <div className="text-2xl font-bold text-gray-800">Connected Account</div> {/* Increased font size */}
              <div className="text-xl text-blue-600 break-words">{currentAccount || "Not Connected"}</div> {/* Increased font size */}
            </div>
            <div className="w-1/2 text-center">
              <div className="text-2xl font-bold text-gray-800">Lottery Balance</div> {/* Increased font size */}
              <div className="text-xl text-green-600">{balance} ETH</div> {/* Increased font size */}
            </div>
          </div>
  
          <div className="mb-8">
            <div className="grid grid-cols-5 gap-6 mt-6"> {/* Increased gap and margin-top */}
              <Cards handlefunc={participate} img={"/person.png"} btn_name={'Participate'} alt="Participate" btncolor={'bg-red-600'} />
              <Cards handlefunc={fetchPlayers} img={"/group2.webp"} btn_name={'Get Players'} alt="Get Players" btncolor={'bg-green-600'} />
              <Cards handlefunc={fetchBalance} img={"/wallet.png"} btn_name={'Get Balance'} alt="Get Balance" btncolor={'bg-blue-600'} />
              <Cards handlefunc={pickWinner} img={"/Crown Winner.png"} btn_name={'Pick Winner'} alt="Pick Winner" btncolor={'bg-yellow-600'} />
              {/* "Transfer Money" Card - Only visible to manager */}
              {currentAccount === manager && (
                <VideoCard handlefunc={transferPrize} videoSrc={"/Balance.mp4"} btn_name={'Transfer Money'} alt="Transfer Money" btncolor={'bg-purple-600'} />
              )}
            </div>
          </div>
          <Table playerarr={players} winner={winner} />
        </div>
      </div>
    </>
  );
  
};

export default Pickwinner;
