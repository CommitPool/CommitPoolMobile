import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Button, TouchableOpacity } from "react-native";
import ConfettiCannon from 'react-native-confetti-cannon';
import QRCode from 'react-native-qrcode-svg';


export default class Wallet extends Component <{next: any, account: any}, {balance: Number}> {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0.0
    };
  }

    componentDidMount() {
        setInterval(() => {
            this.setState({balance: 2.4})
        }, 3000)
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
                <Text style={{fontSize: 30, color: 'white', marginTop: 25}}>Balance: {this.state.balance} ETH</Text>
            </View>
            <TouchableOpacity
                    style={{width: 300, height: 50, backgroundColor: '#D45353', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.props.next(5)}>
                <Text style={{fontSize: 30, color: 'white'}}>Get Started!</Text>
            </TouchableOpacity>
        </View>
    );
  }
}