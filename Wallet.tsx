import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Button, TouchableOpacity, Clipboard } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import QRCode from 'react-native-qrcode-svg';
import { ethers } from 'ethers';
import daiAbi from './daiAbi.json'
import abi from './abi2.json'


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
    let provider =  new ethers.providers.InfuraProvider('ropsten','bec77b2c1b174308bcaa3e622828448f');
    
    let privateKey = this.props.account.signingKey.privateKey;
    let wallet = new ethers.Wallet(privateKey);
    wallet = wallet.connect(provider);
    let contractAddress = '0xc2118d4d90b274016cb7a54c03ef52e6c537d957';
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
    let provider =  new ethers.providers.InfuraProvider('ropsten','bec77b2c1b174308bcaa3e622828448f');
    let commitPoolContractAddress = '0x425da152ee61a31dfc9daed2e3940c0525ce678f';
    let commitPoolContract = new ethers.Contract(commitPoolContractAddress, abi, provider);
    const commitment = await commitPoolContract.commitments(this.props.account.signingKey.address)
    if(commitment.exists){
      this.props.next(7)
    } else {
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
                <Text style={{fontSize: 30, color: 'white', marginTop: 25}}>{this.state.balance} ETH</Text>
                <Text style={{fontSize: 30, color: 'white', marginTop: 25}}>{this.state.daiBalance} Dai</Text>
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