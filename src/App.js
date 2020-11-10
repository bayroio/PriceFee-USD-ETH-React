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

const ABICODE = require('./contracts/abi/aggregatorInterface.json');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: 0,
      value: null
    };
    this.ETHUSD = this.ETHUSD.bind(this);
  }

  ETHUSD = async () => {
    console.log("--- ETH/USD ---");
    const Web3 = require("web3");
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/fedfa150b08c4b8faacdc53c2e673798"
      )
    );
    const aggregatorInterfaceABI = ABICODE;
    const addrETH = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
    const addrDAI = "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF";
    const addrCHF = "0x5e601CF5EF284Bcd12decBDa189479413284E1d2";
    const addrAUD = "0x21c095d2aDa464A294956eA058077F14F66535af";
    const addrEUR = "0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F";
    const priceFeed = new web3.eth.Contract(aggregatorInterfaceABI, addrETH);
    priceFeed.methods
      .latestAnswer()
      .call()
      .then((price) => {
        //Do something with price
        this.setState({value: price});
        console.log(price);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Using ChainLink</h1>
        <h2>Using the ETH/USD Price Feed</h2>
        <p>https://feeds.chain.link/eth-usd</p>
        <p>Network: rinkeby</p>
        <p>Aggregator: ETH/USD</p>
        <p>Address: 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e</p>
        <p/>
        <select id="mySelect" onChange={this.setCoin}>
          <option value="0">ETH</option>
          <option value="1">DAI</option>
          <option value="2">CHF</option>
          <option value="3">AUD</option>
          <option value="4">EUR</option>
        </select>
        <Button variant="primary" onClick={this.ETHUSD}>
          Tell me the Price
        </Button>
        <p/>
        {this.state.value}
      </div>
    );
  }
}
export default App;