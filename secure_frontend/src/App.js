import React, { useState, useEffect } from "react";
import { Contract, BrowserProvider } from "ethers";
import EvidenceStorage from "./abi/EvidenceStorage.json";
import Navbar from "./components/Navbar";
import Judge from './components/Judge';
import Police from './components/Police';

function App() {
  const [role, setRole] = useState(null);
  const [account, setAccount] = useState(null);
  const [evidenceContract, setEvidenceContract] = useState(null)
  const EVIDENCE_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  async function connectWallet() {
    window.ethereum
      .request({ method: "eth_requestAccounts", })
      .then((accounts) => {
        setAccount(accounts[0])
        setIsWalletConnected(true);
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(error);
      })
  }
  useEffect(() => {
    function initEvidenceContract() {
      const provider = new BrowserProvider(window.ethereum)
      provider.getSigner().then((signer) => {
        setEvidenceContract(new Contract(EVIDENCE_CONTRACT_ADDRESS, EvidenceStorage.abi, signer))
      }).catch((error) => {
        console.error("Error initializing contract:")
      })
    }
    if (isWalletConnected) {
      initEvidenceContract();
    }
  }, [isWalletConnected]);


  useEffect(() => {
    const getRole = async () => {
      if (evidenceContract && account) {
        try {
          const userRole = await evidenceContract.getRole(account);
          setRole(userRole);
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      }
    };
    getRole();
  }, [evidenceContract, account]);

  return (
    <div>
      <Navbar connectWallet={connectWallet} isWalletConnected={isWalletConnected} isWalletInstalled={isWalletInstalled} />
      {account && (
        <div>
          {role === 'judge' && <Judge />}
          {role === 'police' && <Police />}
        </div>
      )}
    </div>
  );
}

export default App;
