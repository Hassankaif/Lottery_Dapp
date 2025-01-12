// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Lottery{

    address public Manager;
    address payable public Winner;
    address payable[] public Players;

    constructor(){
        Manager=msg.sender;
    }

    function participate() public payable  {
        require(msg.value==1 ether, "PLEASE PAY THE REQUIRED 1 ETHER TO PARTICIPATE");
        Players.push(payable (msg.sender));
    }

    function getBalance() public view returns (uint){
        require(Manager==msg.sender, "You are not the manager, so you cant check balance");
        return address(this).balance;
    }

    // function random() internal view returns (uint){
    //     return uint(keccak256(abi.encodePacked(block.prevrandao,block.timestamp,Players.length)));
    // }
    function random() internal view returns (uint) {
    return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, Players.length)));
}

    function getPlayers() public view returns(address payable[] memory){
        return Players;
    }

    function pickWinner() public {
        require(Manager==msg.sender,"access denied");
        require(Players.length>=3,"not enough players to play,plz wait...");

        uint ran=random();
        uint indx=ran % Players.length ;
        Winner=Players[indx];
        Winner.transfer(getBalance());
        Players=new address payable[](0);
    }
}