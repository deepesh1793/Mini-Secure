// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract EvidenceStorage is AccessControl {
    bytes32 public constant JUDGE_ROLE = keccak256("JUDGE_ROLE");
    bytes32 public constant POLICE_ROLE = keccak256("POLICE_ROLE");

    struct Evidence {
        string ipfsHash;
        address uploader;
        mapping(address => bool) accessList;
    }

    mapping(uint256 => Evidence) public evidences;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(JUDGE_ROLE, msg.sender);
        //Consider hardcoding this if difficult to implement

    }

    function uploadEvidence(uint256 _evidenceId, string memory _ipfsHash) public {
        Evidence storage evidence = evidences[_evidenceId];
        evidence.ipfsHash = _ipfsHash;
        evidence.uploader = msg.sender;
        evidence.accessList[msg.sender] = true; // uploader always has access
    }

    function approveEvidence(uint256 _evidenceId, address _user) public onlyRole(JUDGE_ROLE) {
        Evidence storage evidence = evidences[_evidenceId];
        require(evidence.uploader != address(0), "Evidence does not exist");
        evidence.accessList[_user] = true; // grant access to the specified user
    }

    function getEvidence(uint256 _evidenceId) public view returns (string memory, address) {
        Evidence storage evidence = evidences[_evidenceId];
        require(evidence.accessList[msg.sender], "Access Denied");
        return (evidence.ipfsHash, evidence.uploader);
    }

    function getRole(address user) public view returns (string memory) {
        if (hasRole(JUDGE_ROLE, user)) {
            return "judge";
        } else if (hasRole(POLICE_ROLE, user)) {
            return "police";
        } else {
            return "none";
        }
    }

    function addPoliceRole(address account) public onlyRole(JUDGE_ROLE) {
        _grantRole(POLICE_ROLE, account);
    }
}
