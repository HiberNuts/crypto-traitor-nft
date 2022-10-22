import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { ethers } from "ethers";
import abi from "./utils/abi.json";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./App.css";

import CancelIcon from "@mui/icons-material/Cancel";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
  border: "none",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f3e7e2",
};

function App() {
  const [CurrentAccount, setCurrentAccount] = useState("");
  const CONTRACT_ADDRESS = "0x4Ee2ef0bd96cff4Fdfe4d182794C82257b60CCD9";
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [noOfMint, setnoOfMint] = useState(0);
  const [network, setnetwork] = useState(false);
  const [chain, setchain] = useState("");
  const [error, seterror] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => seterror(false);

  const checkIfWalletIsConnected = async () => {
    seterror(false);
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length != 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }

    let chainId = await ethereum.request({ method: "eth_chainId" });
    setchain(chainId);
    console.log("Connected to chain " + chainId);

    // String, hex code of the chainId of the Rinkebey test network
    const goerliChainId = "0x5";
    if (chainId !== goerliChainId) {
      setnetwork(true);
      seterror(false);
    } else {
      setnetwork(false);
      seterror(false);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
    try {
      setloading(true);
      seterror(false);
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        let nftTxn = await connectedContract.mint(noOfMint, {
          value: ethers.utils.parseUnits("0.01", "ether"),
        });

        await nftTxn.wait();
        setloading(false);
        setsuccess(true);
        seterror(false);
        setInterval(() => {
          setsuccess(false);
        }, 6000);
        setnoOfMint(0);

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      }
    } catch (error) {
      console.log(error);
      seterror(true);
      setInterval(() => {
        setsuccess(false);
      }, 1000);
      setloading(false);
      setsuccess(false);
      setnoOfMint(0);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [CurrentAccount, chain]);

  return (
    <div className="App">
      <div className="wrapper"></div>
      <div className="container">
        <Navbar
          connectWallet={connectWallet}
          CurrentAccount={CurrentAccount}
          setCurrentAccount={setCurrentAccount}
          noOfMint={noOfMint}
          setnoOfMint={setnoOfMint}
        />
        <Hero
          connectWallet={connectWallet}
          CurrentAccount={CurrentAccount}
          setCurrentAccount={setCurrentAccount}
          noOfMint={noOfMint}
          setnoOfMint={setnoOfMint}
          askContractToMintNft={askContractToMintNft}
        />
        <Modal open={loading} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <CircularProgress />
            <Typography sx={{ marginLeft: "20px" }} id="modal-modal-description">
              "Preparing your space suit, just a second please..."
            </Typography>
          </Box>
        </Modal>
        <Modal open={success} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <CheckCircleIcon sx={{ color: "green" }} />
            <Typography sx={{ marginLeft: "20px" }} id="modal-modal-description">
              NFT Minted
            </Typography>
          </Box>
        </Modal>
        <Modal open={network} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography sx={{ marginLeft: "20px" }} id="modal-modal-description">
              Please Connect to Goerli network
            </Typography>
          </Box>
        </Modal>
        <Modal
          onClose={handleClose}
          open={error}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CancelIcon sx={{ color: "red" }} />
            <Typography sx={{ marginLeft: "20px" }} id="modal-modal-description">
              Oh! an error occured while submiting your transaction.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default App;
