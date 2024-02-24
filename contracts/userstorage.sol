// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UserContract {
    
    struct User {
        string email;
        address walletAddress;
        string[] ipfsHashes;
        bool isRegistered;
    }
    
    mapping(address => User) public users;
    
    event NewUserRegistered(address indexed userAddress, string email, address walletAddress);
    event NewImageUploaded(address indexed userAddress, string ipfsHash);
    
    function registerUser(string memory _email, address _walletAddress) public {
        require(!users[_walletAddress].isRegistered, "User already registered");
        users[_walletAddress] = User(_email, _walletAddress, new string[](0), true);
        emit NewUserRegistered(_walletAddress, _email, _walletAddress);
    }
    
    function uploadImage(string memory _ipfsHash, address _walletAddress) public {
        require(users[_walletAddress].isRegistered, "User not registered");
        users[_walletAddress].ipfsHashes.push(_ipfsHash);
        emit NewImageUploaded(_walletAddress, _ipfsHash);
    }
    
    function getUserImages(address _userAddress) public view returns (string[] memory) {
        require(users[_userAddress].isRegistered, "User not registered");
        return users[_userAddress].ipfsHashes;
    }
    
}