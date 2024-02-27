//SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract HashStorage {

    mapping(string => bool) public hashes;

    function store(string memory hash) public {
        hashes[hash] = true;
    }

    function hasHash(string memory hash) public view returns (bool) {
        return hashes[hash];
    }

}