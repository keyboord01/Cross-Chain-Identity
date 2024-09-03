const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentityRegistry", function () {
  let IdentityRegistry, identityRegistry, owner, addr1;

  beforeEach(async function () {
    IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");
    [owner, addr1] = await ethers.getSigners();

    identityRegistry = await IdentityRegistry.deploy();
  });

  describe("Registration", function () {
    it("Should register a new identity", async function () {
      await identityRegistry.connect(addr1).registerIdentity("hash1");
      const identity = await identityRegistry.getIdentity(addr1.address);
      expect(identity[0]).to.equal("hash1");
      expect(identity[1]).to.equal(false);
    });

    it("Should not allow duplicate registration", async function () {
      await identityRegistry.connect(addr1).registerIdentity("hash1");
      await expect(
        identityRegistry.connect(addr1).registerIdentity("hash2")
      ).to.be.revertedWith("Identity already registered");
    });
  });

  describe("Verification", function () {
    it("Should verify the identity", async function () {
      await identityRegistry.connect(addr1).registerIdentity("hash1");
      await identityRegistry.connect(addr1).verifyIdentity();
      const identity = await identityRegistry.getIdentity(addr1.address);
      expect(identity[1]).to.equal(true);
    });

    it("Should not verify non-existing identity", async function () {
      await expect(
        identityRegistry.connect(addr1).verifyIdentity()
      ).to.be.revertedWith("Identity not found");
    });
  });
});
