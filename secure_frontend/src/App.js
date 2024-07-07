import React, { useState, useEffect } from "react";
import { Contract, BrowserProvider } from "ethers";
import { Routes, Route } from "react-router-dom";
import EvidenceStorage from "./abi/EvidenceStorage.json";
import Navbar from "./components/Navbar";
import Judge from './components/Judge';
import Police from './components/Police';
import Retrieve from "./components/Retrieve";
import Upload from "./components/Upload";
import Authorize from "./components/Authorize";
import Approve from "./components/Approve";
import styles from "./style";
import { Billing, Business, CardDeal, CTA, Footer, Stats, Testimonials, Hero } from "./components";

function App() {
  const [role, setRole] = useState(null);
  const [account, setAccount] = useState(null);
  const [evidenceContract, setEvidenceContract] = useState(null)
  const EVIDENCE_CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" //Bring it in from the json file
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
        console.error("Error initializing contract:", error);
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
          console.log(userRole)
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
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar connectWallet={connectWallet} isWalletConnected={isWalletConnected} isWalletInstalled={isWalletInstalled} />
        </div>
      </div>
      {!account ? (
        <>
          <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
              <Hero />
            </div>
          </div>
          <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <Stats />
              <Business />
              <Billing />
              <CardDeal />
              <Testimonials />
              <CTA />
              <Footer />
            </div>
          </div>
        </>
      ) : (
        <Routes>
          {role === 'judge' && (judgeRoutes)}
          {role === 'police' && policeRoutes}
        </Routes>
      )}
    </div>
  );
}

export default App;
