import React, { useState, useEffect } from "react";
import { Contract, BrowserProvider } from "ethers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EvidenceStorage from "./abi/EvidenceStorage.json";
import Navbar from "./components/Navbar";
import Judge from './components/Judge';
import Police from './components/Police';
import Retrieve from "./components/Retrieve";
import Upload from "./components/Upload";
import Authorize from "./components/Authorize";
import Approve from "./components/Approve";

function App() {
  const [role, setRole] = useState(null);
  const [account, setAccount] = useState(null);
  const [evidenceContract, setEvidenceContract] = useState(null)
  const EVIDENCE_CONTRACT_ADDRESS = "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e" //Bring it in from the json file
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
        console.log(account)
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
          console.log(userRole)
          setRole(userRole);
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      }
    };
    getRole();
  }, [evidenceContract, account]);

  const judgeRoutes = (
    <>
      <Route path="/" element={<Judge />} />
      <Route path="/retrieve" element={<Retrieve evidenceContract={evidenceContract} />} />
      <Route path="/upload" element={<Upload evidenceContract={evidenceContract} />} />
      <Route path="/authorize" element={<Authorize evidenceContract={evidenceContract} />} />
      <Route path="/approve" element={<Approve evidenceContract={evidenceContract} />} />
    </>
  );

  const policeRoutes = (
    <>
      <Route path="/" element={<Police />} />
      <Route path="/retrieve" element={<Retrieve evidenceContract={evidenceContract} />} />
      <Route path="/upload" element={<Upload evidenceContract={evidenceContract} />} />
    </>
  );

  return (
    <div>
      <Navbar connectWallet={connectWallet} isWalletConnected={isWalletConnected} isWalletInstalled={isWalletInstalled} />
      {account && (
        <Routes>
          {role === 'judge' && judgeRoutes}
          {role === 'police' && policeRoutes}
        </Routes>
      )}
    </div>
  );
}

export default App;
