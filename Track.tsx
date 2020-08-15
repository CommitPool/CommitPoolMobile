import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Button, TouchableOpacity } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ethers } from 'ethers';
import abi from './abi.json'

export default class Track extends Component <{next: any, account: any}, {loading: Boolean, step: Number, fill: number}> {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      fill: 60,
      loading: false
    };
  }

  componentDidMount() {
      setInterval(() => {
        this.setState({fill: 100})
      }, 500)
  }

  async getUpdatedActivity() {
    new ethers.providers.InfuraProvider('ropsten',)
    
    let provider = ethers.getDefaultProvider('ropsten','f7Bb4CKYnN0MVFStLUwvq7zhTbG7KFmKpxqKwqzQ');
    
    let privateKey = this.props.account.signingKey.privateKey;
    let wallet = new ethers.Wallet(privateKey);
    
    wallet = wallet.connect(provider);

    
    let contractAddress = '0xcd054948566b3dd9d3fc48999ade95bc484188a5';
    let contract = new ethers.Contract(contractAddress, abi, provider);

    let contractWithSigner = contract.connect(wallet);
    
    this.setState({loading: true})
    try {
        console.log(this.props.account.signingKey.address)
        await contractWithSigner.requestActivityDistance(this.props.account.signingKey.address, '0x4E67b6154cAFD92fE90420a96f59cc5a2C61c8c7', '2a384addea684528859b38c79f930745', {gasLimit: 500000});
        this.setState({loading: false})
        this.props.next(7)
    } catch (error) {
        console.log(error)
        this.setState({loading: false})
    }
  }

  render() {
    return (
        <View style={{backgroundColor: '#D45353', flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            {this.state.loading ? <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2}}><Text style={{fontSize: 25}}>⌛</Text></View> : undefined}
            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 50, color: 'white', marginBottom: 70}}>Track</Text>
                <AnimatedCircularProgress
                    size={180}
                    width={15}
                    rotation={0}
                    fill={this.state.fill}
                    tintColor="white"
                    onAnimationComplete={() => console.log('onAnimationComplete')}
                    backgroundColor="#D45353" >
                    {
                        (fill) => (
                        <Text style={{color: 'white', fontSize: 30}}>
                            {this.state.fill}%
                        </Text>
                        )
                    }
                </AnimatedCircularProgress>
                <Text style={{fontSize: 22, color: 'white', marginTop: 25}}>{this.state.fill/10}/10 Miles</Text>
            </View>
            <TouchableOpacity
                    style={this.state.fill !== 100 ? {width: 300, height: 50, backgroundColor: '#999', alignItems: 'center', justifyContent: 'center'}
                        : {width: 300, height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.getUpdatedActivity()}
                    disabled={this.state.fill !== 100}>
                <Text style={{fontSize: 30}}>Claim Reward</Text>
            </TouchableOpacity>
        </View>
    );
  }
}