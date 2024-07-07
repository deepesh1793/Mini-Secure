import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { close, logo, menu } from "../assets";
import { navLinks2 } from "../constants";

const Navbar2 = ({ connectWallet, isWalletConnected, isWalletInstalled }) => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);

    return (
        <nav className="w-full flex py-6 justify-between items-center navbar">
            <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" />
            <div className="flex space-x-8 items-center">
                <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                    {navLinks2.map((nav, index) => (
                        <li
                            key={nav.id}
                            className={`font-poppins font-normal cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                } ${index === navLinks2.length - 1 ? "mr-0" : "mr-10"}`}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                </ul>

                <div className="relative flex h-16 items-center justify-end">
                    {isWalletInstalled ? (
                        <button
                            className="text-white px-6 py-2 rounded hover:bg-gray-200 hover:text-black transition-colors"
                            onClick={connectWallet}
                        >
                            {isWalletConnected ? `Connected` : `Connect Wallet`}
                        </button>
                    ) : (
                        <p className="text-white">Install MetaMask wallet</p>
                    )}
                </div>
            </div>
            <div className="sm:hidden flex flex-1 justify-end items-center">
                <img
                    src={toggle ? close : menu}
                    alt="menu"
                    className="w-[28px] h-[28px] object-contain"
                    onClick={() => setToggle(!toggle)}
                />

                <div
                    className={`${!toggle ? "hidden" : "flex"
                        } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
                >
                    <ul className="list-none flex justify-end items-start flex-1 flex-col">
                        {navLinks2.map((nav, index) => (
                            <li
                                key={nav.id}
                                className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-white" : "text-dimWhite"
                                    } ${index === navLinks2.length - 1 ? "mb-0" : "mb-4"}`}
                                onClick={() => {
                                    setActive(nav.title)
                                    const navigate = useNavigate();
                                    const handleButtonClick = (path) => {
                                        navigate(path);
                                    }
                                }
                                }
                            >
                                <a href={`#${nav.id}`}>{nav.title}</a>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Navbar2;
