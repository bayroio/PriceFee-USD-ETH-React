/**
 * Using the ETH/USD Price Feed: https://feeds.chain.link/eth-usd
 * Network: Ropsten
 * Aggregator: ETH/USD
 * Address: 0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507
 */

import React from "react";
import "./styles.css";

import Button from "react-bootstrap/Button";
//import Web3 from "web3";

async function ETHUSD() {
  console.log("--- ETH/USD ---");
  const Web3 = require("web3");
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://ropsten.infura.io/v3/4a822f7586ac479bafffc81d99167a17"
    )
  );
  const aggregatorInterfaceABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "int256",
          name: "current",
          type: "int256"
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "roundId",
          type: "uint256"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "timestamp",
          type: "uint256"
        }
      ],
      name: "AnswerUpdated",
      type: "event"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "roundId",
          type: "uint256"
        },
        {
          indexed: true,
          internalType: "address",
          name: "startedBy",
          type: "address"
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "startedAt",
          type: "uint256"
        }
      ],
      name: "NewRound",
      type: "event"
    },
    {
      inputs: [{ internalType: "uint256", name: "roundId", type: "uint256" }],
      name: "getAnswer",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [{ internalType: "uint256", name: "roundId", type: "uint256" }],
      name: "getTimestamp",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "latestAnswer",
      outputs: [{ internalType: "int256", name: "", type: "int256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "latestRound",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "latestTimestamp",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function"
    }
  ];
  const addr = "0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507";
  const priceFeed = new web3.eth.Contract(aggregatorInterfaceABI, addr);
  priceFeed.methods
    .latestAnswer()
    .call()
    .then((price) => {
      //Do something with price
      console.log(price);
    });
}

export default function App() {
  return (
    <div className="App">
      <h1>Using ChainLink</h1>
      <h2>Using the ETH/USD Price Feed</h2>
      <p>https://feeds.chain.link/eth-usd</p>
      <p>Network: Ropsten</p>
      <p>Aggregator: ETH/USD</p>
      <p>Address: 0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507</p>
      <Button variant="primary" onClick={ETHUSD}>
        ETH/USD
      </Button>{" "}
    </div>
  );
}
