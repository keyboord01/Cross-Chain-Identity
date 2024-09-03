// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityRegistry {
    struct Identity {
        address user;
        string dataHash;
        bool isVerified;
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(address user, string dataHash);
    event IdentityVerified(address user);

    function registerIdentity(string memory _dataHash) public {
        require(bytes(_dataHash).length > 0, "Invalid data hash");
        require(identities[msg.sender].user == address(0), "Identity already registered");

        identities[msg.sender] = Identity(msg.sender, _dataHash, false);
        emit IdentityRegistered(msg.sender, _dataHash);
    }

    function verifyIdentity() public {
        require(identities[msg.sender].user == msg.sender, "Identity not found");
        require(!identities[msg.sender].isVerified, "Identity already verified");

        identities[msg.sender].isVerified = true;
        emit IdentityVerified(msg.sender);
    }

    function getIdentity(address _user) public view returns (string memory, bool) {
        Identity memory identity = identities[_user];
        return (identity.dataHash, identity.isVerified);
    }
}
