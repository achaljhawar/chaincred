// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.24;
contract walletwhitelist {
    struct User {
        string email;
        address walletAddress; 
        bool isRegistered;
    }
    mapping(address => User) private users;
    mapping(string => address) private emailToWallet;
    function registerUser(string memory _email, address _walletAddress) public {
        users[_walletAddress] = User(_email, _walletAddress, true);
        emailToWallet[_email] = _walletAddress;
    }
    function checkUserByEmail(string memory _email) public view returns (bool) {
        address walletAddress = emailToWallet[_email];
        if(walletAddress == address(0)) {
            return false; 
        }
        return users[walletAddress].isRegistered;
    }

    function checkUserByWallet(address _walletAddress) public view returns (bool) {
        return users[_walletAddress].isRegistered;
    }
}