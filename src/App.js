/**
 * Using the ETH/USD Price Feed: https://feeds.chain.link/eth-usd
 * Network: Ropsten
 * Aggregator: ETH/USD
 * Address: 0x8468b2bDCE073A157E560AA4D9CcF6dB1DB98507
 */

import React from "react";
import "./styles.css";
//import Web3 from "web3";

const ABICODE = require('./contracts/abi/aggregatorInterface.json');
const RESOURCES = require('./resources/directoryRinkeby.json');
const currencies = RESOURCES.tokens;
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      intro1: 0,
      intro2: 0,
      token1: 0,
      token2: 0,
      value1: null,
      value2: null,
      precioUnitario: null
    };
  }

  componentDidMount = async () =>{
    this.ETHUSD1();
    this.ETHUSD2();
  };

  handleCoinChange (e, property, method) {
    const { value } = e.target;
    this.setState({[property]: value}, () => {
      if(method === 1){
        this.ETHUSD1();
      } else {
        this.ETHUSD2();
      }
    });
  }

  handleValueChange (e, property, method) {
    const { value } = e.target;
    this.setState({[property]: value}, () => {
      if(method === 1){
        this.calcConverValue(1);
      } else {
        //this.calcConverValue(2);
      }
    });
  }

  createSelectItems () {
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
        this.calcConverCoin();
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
        this.calcConverCoin();
      });
  }

  calcConverValue (opc) {
    console.log("Entrando a calcConverValue",opc);
    if(opc === 1){
      var cr = 0;
      var unit = 0;
      const cs = this.state.intro1;
      const priceCS = this.state.value1;
      const priceCR = this.state.value2;
      console.log("CS",cs);
      console.log("priceCS",priceCS);
      console.log("priceCR",priceCR);
      cr = (cs*priceCS)/priceCR;
      unit = cs/cr;
      this.setState({intro2: cr, precioUnitario: unit});
    } else {
      var cr = 0;
      var unit = 0;
      const cs = this.state.intro2;
      const priceCS = this.state.value2;
      const priceCR = this.state.value1;
      console.log("CS",cs);
      console.log("priceCS",priceCS);
      console.log("priceCR",priceCR);
      cr = (cs*priceCS)/priceCR;
      unit = cs/cr;
      this.setState({intro1: cr, precioUnitario: unit});
    }
  }

  calcConverCoin () {
    console.log("Entrando a calcConverCoin");
    var cr = 0;
    var unit = 0;
    const cs = this.state.intro1;
    const priceCS = this.state.value1;
    const priceCR = this.state.value2;
    console.log("CS",cs);
    console.log("priceCS",priceCS);
    console.log("priceCR",priceCR);
    cr = (cs*priceCS)/priceCR;
    unit = cs/cr;
    this.setState({intro2: cr, precioUnitario: unit});
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
        <input name="name" id="name" type="text" value={this.state.intro1} className="Main-box" onChange={e => this.handleValueChange(e, 'intro1', 1)} />
        <select id="mySelect" onChange={e => this.handleCoinChange(e, 'token1', 1)}>
          {this.createSelectItems()}
        </select>
        <p/>
        <input name="name" id="name" type="text" value={this.state.intro2} className="Main-box" onChange={e => this.handleValueChange(e, 'intro2', 2)} />
        <select id="mySelect" onChange={e => this.handleCoinChange(e, 'token2', 2)}>
          {this.createSelectItems()}
        </select>
        <p/>
        Precio Unitario: ${this.state.precioUnitario} USD
        <p/>
        <p/>
      </div>
    );
  }
}
export default App;