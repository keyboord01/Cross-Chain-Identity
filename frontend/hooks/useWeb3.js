import { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "dataHash",
        type: "string",
      },
    ],
    name: "IdentityRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "IdentityVerified",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getIdentity",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_dataHash",
        type: "string",
      },
    ],
    name: "registerIdentity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "verifyIdentity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const useWeb3 = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (!window.ethereum) {
        setError("MetaMask is not installed!");
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const signer = await provider.getSigner();
        setSigner(signer);

        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

        if (!contractAddress) {
          setError("Contract address is not provided!");
          return;
        }

        const contractInstance = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setContract(contractInstance);
      } catch (err) {
        setError(`Failed to initialize web3: ${err.message.slice(0, 100)}`);
      }
    };

    initWeb3();
  }, []);

  return { provider, signer, contract, error };
};

export default useWeb3;
