// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Lottery {

    address public manager;
    address payable public winner;
    address payable[] public players;
    bool public isWinnerPicked;

    event PlayerJoined(address indexed player);
    event WinnerSelected(address indexed winner, uint amount);
    event FundsWithdrawn(address indexed manager, uint amount);
    event PrizeTransferred(address indexed winner, uint amount);

    constructor() {
        manager = msg.sender;
        isWinnerPicked = false;
    }

    modifier onlyManager() {
        require(msg.sender == manager, "Only the manager can call this function.");
        _;
    }

    modifier hasSufficientPlayers() {
        require(players.length >= 3, "Not enough players to draw a winner. At least 3 players required.");
        _;
    }

    function participate() public payable {
        require(msg.value == 1 ether, "Participation fee is 1 ether.");
        players.push(payable(msg.sender));
        emit PlayerJoined(msg.sender);
    }

    function getBalance() public view onlyManager returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function pickWinner() public onlyManager hasSufficientPlayers {
        require(!isWinnerPicked, "Winner has already been picked.");
        uint randomIndex = random() % players.length;
        winner = players[randomIndex];
        emit WinnerSelected(winner, address(this).balance);
        isWinnerPicked = true;
    }

    function transferPrize() public onlyManager {
        require(isWinnerPicked, "No winner picked yet.");
        uint prizeAmount = address(this).balance;
        winner.transfer(prizeAmount);
        emit PrizeTransferred(winner, prizeAmount);
        isWinnerPicked = false;
        players = new address payable[](0);
          }

    function getWinner() public view returns (address payable) {
        return winner;
    }

    function random() internal view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, players.length)));
    }

    function withdrawFunds() public onlyManager {
        require(address(this).balance > 0, "No funds to withdraw.");
        uint balance = address(this).balance;
        payable(manager).transfer(balance);
        emit FundsWithdrawn(manager, balance);
    }
}
