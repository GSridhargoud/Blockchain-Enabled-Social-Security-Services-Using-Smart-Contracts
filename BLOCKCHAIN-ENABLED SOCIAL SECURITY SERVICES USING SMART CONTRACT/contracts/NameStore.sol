// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract NameStore {
    mapping(uint256 => string) public names;           // Store names
    mapping(uint256 => uint256) public contributions;  // Store contributions
    mapping(uint256 => uint256) public withdrawals;    // Store withdrawals
    uint256 public totalBalance;                       // Total balance variable (initialized to 0)
    // Function to store name, contribution, withdrawal, and total balance
    function storeName(uint256 id, string memory name) public {
        names[id] = name;                     // Store the name
        contributions[id] = 0;                // Initialize contribution to 0
        withdrawals[id] = 0;                  // Initialize withdrawal to 0
        totalBalance = 0;                     // Initialize total balance to 0
    }
    // Function to retrieve name
    function getName(uint256 id) public view returns (string memory) {
        return names[id];
    }
    // Function to contribute (updates contribution and total balance)
    function contribute(uint256 id, uint256 amount) public {
        contributions[id] += amount;  // Add the contribution amount to the user's contribution
        totalBalance += amount;       // Add the amount to the total balance
    }
    // Function to withdraw (checks for sufficient balance and processes withdrawal)
    function withdraw(uint256 id, uint256 amount) public {
        if (amount <= totalBalance) {
            withdrawals[id] += amount;   // Add the amount to the user's withdrawals
            totalBalance -= amount;      // Subtract the amount from the total balance
        } else {
            revert("Insufficient funds"); // Revert with an error if insufficient balance
        }
    }
    // Function to get the contribution of a user based on their ID
    function getContribution(uint256 id) public view returns (uint256) {
        return contributions[id];
    }
    // Function to get the withdrawal amount of a user based on their ID
    function getWithdrawal(uint256 id) public view returns (uint256) {
        return withdrawals[id];
    }
    // Function to get the total balance
    function getTotalBalance() public view returns (uint256) {
        return totalBalance;
    }
}
