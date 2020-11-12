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
      token: 0,
      value: null
    };
  }

  setCoin(e, property) {
    const { value } = e.target;
    this.setState({[property]: value});
  }

  createSelectItems() {
    let items = [];
    for (let i = 0; i < currencies.length; i++) {
      items.push(<option key={i} value={i}>{currencies[i].symbol}</option>);
    }
    return items;
  }  

  ETHUSD = async () => {
    console.log("--- TOKEN/USD ---");
    const Web3 = require("web3");
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/fedfa150b08c4b8faacdc53c2e673798"
      )
    );
    const aggregatorInterfaceABI = ABICODE;
    console.log("TOKEN",this.state.token);
    var addr = currencies[this.state.token].address;
    const priceFeed = new web3.eth.Contract(aggregatorInterfaceABI, addr);
    priceFeed.methods
      .latestAnswer()
      .call()
      .then((price) => {
        //Do something with price
        price = price / 100000000;
        this.setState({value: price});
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
        <select id="mySelect" onChange={e => this.setCoin(e, 'token')}>
          {this.createSelectItems()}
        </select>
        <Button variant="primary" onClick={this.ETHUSD}>
          Tell me the Price
        </Button>
        <p/>
        ${this.state.value} USD
      </div>
    );
  }
}
export default App;