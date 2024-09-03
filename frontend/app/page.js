"use client";

import React, { useState } from "react";
import useWeb3 from "../hooks/useWeb3";

export default function Home() {
  const { contract, error } = useWeb3();
  const [dataHash, setDataHash] = useState("");
  const [checkAddress, setCheckAddress] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("");
  const [identityStatus, setIdentityStatus] = useState(null);
  const [identityCheckError, setIdentityCheckError] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState("");

  const registerIdentity = async () => {
    if (!contract) return;

    try {
      const tx = await contract.registerIdentity(dataHash);
      await tx.wait();
      setStatusMessage("Identity registered successfully!");
      setStatusColor("green");
    } catch (error) {
      setStatusMessage(error.reason || "Error registering identity.");
      setStatusColor("red");
    }
  };

  const verifyIdentity = async () => {
    if (!contract) return;

    try {
      const tx = await contract.verifyIdentity();
      await tx.wait();
      setVerificationMessage("Identity verified successfully!");
    } catch (error) {
      setVerificationMessage("Error verifying identity.");
      console.error(error);
    }
  };

  const checkIdentity = async () => {
    if (!contract) return;

    try {
      const identity = await contract.getIdentity(checkAddress);
      setIdentityStatus(identity);
      setIdentityCheckError(null);
    } catch (error) {
      setIdentityStatus(null);
      setIdentityCheckError(error.reason || "Error checking identity.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Cross-Chain Identity</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl mb-2">Register Identity</h2>
        <input
          type="text"
          value={dataHash}
          onChange={(e) => setDataHash(e.target.value)}
          placeholder="Enter Data Hash"
          className={`border p-2 mt-4 w-full rounded ${
            statusColor ? `border-${statusColor}-500` : ""
          }`}
        />
        <button
          onClick={registerIdentity}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 mt-4 rounded"
        >
          Register
        </button>
        {statusMessage && (
          <div className={`mt-4 text-${statusColor}-500`}>{statusMessage}</div>
        )}
      </div>
      <div className="mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl">Verify Identity</h2>
        <button
          onClick={verifyIdentity}
          className="bg-green-500 text-white px-4 py-2 mt-4"
        >
          Verify
        </button>
        {verificationMessage && (
          <p className="mt-4 text-green-500">{verificationMessage}</p>
        )}
      </div>

      <div className="mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl mb-2">Check Identity Status</h2>
        <input
          type="text"
          value={checkAddress}
          onChange={(e) => setCheckAddress(e.target.value)}
          placeholder="Enter Address"
          className={`border p-2 mt-4 w-full rounded ${
            identityCheckError ? "border-red-500" : ""
          }`}
        />
        <button
          onClick={checkIdentity}
          className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 mt-4 rounded"
        >
          Check
        </button>
        {identityCheckError && (
          <div className="mt-4 text-red-500">{identityCheckError}</div>
        )}
        {identityStatus && (
          <div className="mt-4">
            <p>Data Hash: {identityStatus[0] || "No Data Hash"}</p>
            <p>Verified: {identityStatus[1] ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
