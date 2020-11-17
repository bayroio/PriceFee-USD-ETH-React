/**
 * Using the ETH/USD Price Feed: https://feeds.chain.link/eth-usd
 * Network: Ropsten
 * Aggregator: ETH/USD
 * Address: 0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507
 */

import React from "react";
import Button from "react-bootstrap/Button";
import "./styles.css";
//import Web3 from "web3";

const ABICODE = require('./contracts/abi/aggregatorInterface.json');
const RESOURCES = require('./resources/directoryRinkeby.json');
const currencies = RESOURCES.tokens;
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token1: 0,
      token2: 0,
      value1: null,
      value2: null
    };
  }



  handleFormChange (e, property, method) {
    const { value } = e.target;
    this.setState({[property]: value}, () => {
      if(method == 1){
        this.ETHUSD1();
      } else {
        this.ETHUSD2();
      }
    });
  }

  createSelectItems() {
    let items = [];
    for (let i = 0; i < currencies.length; i++) {
      items.push(<option key={i} value={i}>{currencies[i].symbol}</option>);
    }
    return items;
  }  

  ETHUSD1 = async () => {
    console.log("--- TOKEN/USD ---");
    const Web3 = require("web3");
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/fedfa150b08c4b8faacdc53c2e673798"
      )
    );
    const aggregatorInterfaceABI = ABICODE;
    console.log("TOKEN",this.state.token1);
    var addr = currencies[this.state.token1].address;
    const priceFeed = new web3.eth.Contract(aggregatorInterfaceABI, addr);
    priceFeed.methods
      .latestAnswer()
      .call()
      .then((price) => {
        //Do something with price
        price = price / 100000000;
        this.setState({value1: price});
        console.log(price);
      });
  }

  ETHUSD2 = async () => {
    console.log("--- TOKEN/USD ---");
    const Web3 = require("web3");
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/fedfa150b08c4b8faacdc53c2e673798"
      )
    );
    const aggregatorInterfaceABI = ABICODE;
    console.log("TOKEN",this.state.token2);
    var addr = currencies[this.state.token2].address;
    const priceFeed = new web3.eth.Contract(aggregatorInterfaceABI, addr);
    priceFeed.methods
      .latestAnswer()
      .call()
      .then((price) => {
        //Do something with price
        price = price / 100000000;
        this.setState({value2: price});
        console.log(price);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Using ChainLink</h1>
        <h2>Using the TOKEN/USD Price Feed</h2>
        <p>https://feeds.chain.link/</p>
        <p>Network: Rinkeby</p>
        <p>Aggregator: Token/USD</p>
        <p/>
        <select id="mySelect" onChange={e => this.handleFormChange(e, 'token1', 1)}>
          {this.createSelectItems()}
        </select>
        &nbsp;=>&nbsp;
        <select id="mySelect" onChange={e => this.handleFormChange(e, 'token2', 2)}>
          {this.createSelectItems()}
        </select>
        <p/>
        ${this.state.value1} USD
        &nbsp;=>&nbsp;
        ${this.state.value2} USD
        <p/>
      </div>
    );
  }
}
export default App;