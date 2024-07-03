import React, { useState, useEffect } from "react";
import { Contract, BrowserProvider } from "ethers";
function Navbar() {
    const [isWalletInstalled, setIsWalletInstalled] = useState(false)
    const [account, setAccount] = useState(null)

    useEffect(() => {
        if (window.ethereum) {
            setIsWalletInstalled(true)
        }
    }, [])

    async function connectWallet() {
        window.ethereum
            .request({ method: "eth_requestAccounts", })
            .then((accounts) => {
                setAccount(accounts[0])
            })
            .catch((error) => {
                alert("Something went wrong");
            })
    }


    return (
        <div className="bg-gray-400">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-end">
                    {isWalletInstalled ? (
                        <button
                            className="border-2 border-black bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors"
                            onClick={connectWallet}
                        >
                            Connect Wallet
                        </button>
                    ) : (
                        <p className="text-white">Install MetaMask wallet</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;