const hre = require("hardhat");

async function main() {
    console.log("Deploying Contract...");
    const evidence = await hre.ethers.deployContract(
        "contracts/EvidenceStorage.sol:EvidenceStorage"
    );
    console.log("Contract deployed to address:", evidence.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
