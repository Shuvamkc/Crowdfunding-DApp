//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Lottery {
    address public manager;
    address payable[] public participants;
    address payable public winner;

    constructor() {
        manager = msg.sender;
    }

    function sendEth() public payable {
        require(msg.value == 0.01 ether);
        participants.push(payable(msg.sender));
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function WinnerRandom() internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        participants.length
                    )
                )
            );
    }

    function getWinner() public {
        uint256 index = WinnerRandom() % participants.length;
        winner = participants[index];
        winner.transfer(getBalance());
        participants = new address payable[](0);
    }

    function allPlayers() public view returns (address payable[] memory) {
        return participants;
    }
}
