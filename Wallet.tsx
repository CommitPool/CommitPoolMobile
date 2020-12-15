import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Button, TouchableOpacity, Clipboard } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import QRCode from 'react-native-qrcode-svg';
import { ethers } from 'ethers';
import daiAbi from './daiAbi.json'
import abi from './abi.json'


export default class Wallet extends Component <{next: any, account: any}, {balance: number, daiBalance: number, commitment: any}> {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0.0,
      daiBalance: 0.0,
      commitment: undefined
    };
  }

  async componentDidMount() {
    const url = 'https://rpc-mumbai.maticvigil.com/v1/e121feda27b4c1387cd0bf9a441e8727f8e86f56'

    const provider = new ethers.providers.JsonRpcProvider(url);
    
    let privateKey = this.props.account.signingKey.privateKey;
    let wallet = new ethers.Wallet(privateKey);
    wallet = wallet.connect(provider);
    let contractAddress = '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1';
    let contract = new ethers.Contract(contractAddress, daiAbi, provider);
    const daiBalance = await contract.balanceOf(this.props.account.signingKey.address)
    const balance = await wallet.getBalance();
    this.setState({balance: balance.div(1000000000000000).toNumber() / 1000})
    this.setState({daiBalance: daiBalance.div(1000000000000000).toNumber() / 1000})

    setInterval(async () => {
      const daiBalance = await contract.balanceOf(this.props.account.signingKey.address)
      const balance = await wallet.getBalance();
      this.setState({balance: balance.div(1000000000000000).toNumber() / 1000})
      this.setState({daiBalance: daiBalance.div(1000000000000000).toNumber() / 1000})
    }, 2500)
  }

  async next() {
    const url = 'https://rpc-mumbai.maticvigil.com/v1/e121feda27b4c1387cd0bf9a441e8727f8e86f56'

    const provider = new ethers.providers.JsonRpcProvider(url);
    let commitPoolContractAddress = '0xF73CE8E7ae4398D7a3ab09c1a86e7BdEF84aDDEF';
    let commitPoolContract = new ethers.Contract(commitPoolContractAddress, abi, provider);
    try {
      const commitment = await commitPoolContract.commitments(this.props.account.signingKey.address);
      if(commitment.exists){
        this.props.next(7)
      } else {
        this.props.next(5)
      }
    } catch (error) {
      this.props.next(5)
    }
  }

  render() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>

            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 50, color: 'white', marginBottom: 70}}>Add Funds</Text>
                <QRCode
                    value="this.props.account.signingKey.address"
                    size={225}
                />
                <Text onPress={()=>Clipboard.setString(this.props.account.signingKey.address)} style={{fontSize: 14, color: 'white', marginTop: 10}}>{this.props.account.signingKey.address}</Text>
                <Text style={{fontSize: 30, color: 'white', marginTop: 25, fontWeight: 'bold'}}>Balances:</Text>
                <Text style={{fontSize: 30, color: 'white', marginTop: 25}}>{this.state.balance} MATIC</Text>
                <Text style={{fontSize: 30, color: 'white', marginTop: 25}}>{this.state.daiBalance} MATIC Dai</Text>
            </View>
            <TouchableOpacity
                    style={{width: 300, height: 50, backgroundColor: '#D45353', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.next()}>
                <Text style={{fontSize: 30, color: 'white'}}>Get Started!</Text>
            </TouchableOpacity>
        </View>
    );
  }
}