const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserContract", function () {
  let userContract;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Deploy a new UserContract instance
    const UserContract = await ethers.getContractFactory("UserContract");
    userContract = await UserContract.deploy();

    [owner, addr1, addr2] = await ethers.getSigners();
  });

  describe("registerUser", function () {
    it("should register a new user", async function () {
      const email = "test@example.com";
      const tx = await userContract.registerUser(email, addr1.address);
      await expect(tx)
        .to.emit(userContract, "NewUserRegistered")
        .withArgs(addr1.address, email, addr1.address);

      const user = await userContract.users(addr1.address);
      expect(user.email).to.equal(email);
      expect(user.isRegistered).to.equal(true);
    });

    it("should revert if user already registered", async function () {
      await userContract.registerUser("test@example.com", addr1.address);

      await expect(
        userContract.registerUser("test@example.com", addr1.address)
      ).to.be.revertedWith("User already registered");
    });
  });

  describe("uploadImage", function () {
    it("should allow registered user to upload image", async function () {
      await userContract.registerUser("test@example.com", addr1.address);

      const ipfsHash = "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco";
      const tx = await userContract.uploadImage(ipfsHash, addr1.address);
      await expect(tx)
        .to.emit(userContract, "NewImageUploaded")
        .withArgs(addr1.address, ipfsHash);

      const userImages = await userContract.getUserImages(addr1.address);
      expect(userImages[0]).to.equal(ipfsHash);
    });

    it("should revert if user not registered", async function () {
      const ipfsHash = "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco";

      await expect(
        userContract.uploadImage(ipfsHash, addr1.address)
      ).to.be.revertedWith("User not registered");
    });
  });

  describe("getUserImages", function () {
    it("should return images for registered user", async function () {
      await userContract.registerUser("test@example.com", addr1.address);

      const ipfsHash1 = "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco";
      await userContract.uploadImage(ipfsHash1, addr1.address);

      const ipfsHash2 = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"; 
      await userContract.uploadImage(ipfsHash2, addr1.address);

      const images = await userContract.getUserImages(addr1.address);
      expect(images.length).to.equal(2);
      expect(images[0]).to.equal(ipfsHash1);
      expect(images[1]).to.equal(ipfsHash2);
    });

    it("should revert if user not registered", async function () {
      await expect(
        userContract.getUserImages(addr1.address)
      ).to.be.revertedWith("User not registered"); 
    });
  });
});