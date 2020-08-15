import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Button, TouchableOpacity, TextInput } from "react-native";
import { ethers } from 'ethers';
import abi from './abi.json'

export default class MakeCommitment extends Component <{next: any, account: any}, {txSent: Boolean, loading: Boolean, distance: Number, stake: Number}> {
  constructor(props) {
    super(props);
    this.state = {
      distance: 0,
      stake: 0,
      loading: false,
      txSent: false,
    };
  }

  async createCommitment() {
    new ethers.providers.InfuraProvider('ropsten',)
    
    let provider = ethers.getDefaultProvider('ropsten','f7Bb4CKYnN0MVFStLUwvq7zhTbG7KFmKpxqKwqzQ');
    
    let privateKey = this.props.account.signingKey.privateKey;
    let wallet = new ethers.Wallet(privateKey);
    
    wallet = wallet.connect(provider);
    
    let contractAddress = '0xcd054948566b3dd9d3fc48999ade95bc484188a5';
    let contract = new ethers.Contract(contractAddress, abi, provider);

    let contractWithSigner = contract.connect(wallet);
    
    // Call the verifyString function
    const distanceInKm = Math.floor(this.state.distance / 0.000621371)
    const fiveDays = new Date().getTime() - (86400 * 1000 * 5)
    this.setState({loading: true})
    await contractWithSigner.makeCommitment(distanceInKm * 100, fiveDays, this.state.stake);
    this.setState({loading: false, txSent: true})
  }

  render() {
    return (
        <View style={{backgroundColor: '#D45353', flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            {!this.state.txSent ? 
            <View style={{backgroundColor: '#D45353', flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
                {this.state.loading ? <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2}}><Text style={{fontSize: 25}}>⌛</Text></View> : undefined}
                <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection: "row", width: 215, padding: 10}}>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Activity:</Text>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Run 🏃‍♂️</Text>
                    </View>
                    <View style={{flexDirection: "row", width: 215, padding: 10}}>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Distance:</Text>
                        <View style={{flex: 1}}>
                            <TextInput style={{backgroundColor: 'white', fontSize: 22, color: 'black', width: 100 + '%'}} onChangeText={text => this.setState({distance: Number(text)})}></TextInput>
                        </View>                    
                    </View>
                    <View style={{flexDirection: "row", width: 215, padding: 10}}>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Stake:</Text>
                        <View style={{flex: 1}}>
                            <TextInput style={{backgroundColor: 'white', fontSize: 22, color: 'black', width: 100 + '%'}} onChangeText={text => this.setState({stake: Number(text)})}></TextInput>
                        </View>
                    </View>
                    <View style={{flexDirection: "row", width: 215, padding: 10}}>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Deadline:</Text>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>7 Days</Text>
                    </View>
                </View>

                <TouchableOpacity
                        style={{width: 300, height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => this.createCommitment()}>
                    <Text style={{fontSize: 30}}>Stake and Commit</Text>
                </TouchableOpacity>
            </View>
            :
            <View style={{backgroundColor: '#D45353', flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
                {this.state.loading ? <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, left: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2}}><Text style={{fontSize: 25}}>⌛</Text></View> : undefined}
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 50}}>✔️</Text>
                    <Text style={{fontSize: 30, color: 'white', marginBottom: 25}}>Commitment Created</Text>
                    <View style={{flexDirection: "row", width: 215, padding: 10}}>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Activity:</Text>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Run 🏃‍♂️</Text>
                    </View>
                    <View style={{flexDirection: "row", width: 215, padding: 10}}>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Distance:</Text>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>10 Miles</Text>
                    </View>
                    <View style={{flexDirection: "row", width: 215, padding: 10}}>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Stake:</Text>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>10 Dai</Text>
                    </View>
                    <View style={{flexDirection: "row", width: 215, padding: 10}}>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>Deadline:</Text>
                        <Text style={{flex: 1, color: 'white', fontSize: 22}}>7 Days</Text>
                    </View>
                    <Text style={{color: 'white', fontSize: 22, marginTop: 25}}>Etherscan <Image style={{width: 10, height: 10}} source={require('./assets/arrow-popout.svg')}></Image></Text>
                </View>

                <TouchableOpacity
                        style={{width: 300, height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}
                        onPress={() => this.props.next(6)}>
                    <Text style={{fontSize: 30}}>Track Progress</Text>
                </TouchableOpacity>
            </View>}
        </View>
        
    );
  }
}