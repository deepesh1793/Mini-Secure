import './App.css';
import React, { useState, useEffect } from "react";
import { Contract, BrowserProvider } from "ethers";
import Navbar from './components/Navbar';
import Jugde from './components/Judge';
function App() {
  return (
    <>
      <Navbar />
      <Jugde />
    </>
  )
}

export default App;
