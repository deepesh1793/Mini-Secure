// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract EvidenceStorage is AccessControl {
    bytes32 public constant JUDGE_ROLE = keccak256("JUDGE_ROLE");
    bytes32 public constant POLICE_ROLE = keccak256("POLICE_ROLE");
    
    struct Evidence {
        string ipfsHash;
        address uploader;
        bool approved;
    }
    
    mapping(uint256 => Evidence) public evidences;
    uint256 public evidenceCount;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function uploadEvidence(string memory _ipfsHash) public onlyRole(POLICE_ROLE) {
        evidences[evidenceCount] = Evidence(_ipfsHash, msg.sender, false);
        evidenceCount++;
    }

    function approveEvidence(uint256 _evidenceId) public onlyRole(JUDGE_ROLE) {
        evidences[_evidenceId].approved = true;
    }

    function getEvidence(uint256 _evidenceId) public view returns (string memory, address, bool) {
        Evidence memory evidence = evidences[_evidenceId];
        require(hasRole(JUDGE_ROLE, msg.sender) || evidence.uploader == msg.sender || evidence.approved, "Access Denied");
        return (evidence.ipfsHash, evidence.uploader, evidence.approved);
    }
}
