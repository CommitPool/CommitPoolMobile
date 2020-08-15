import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Account from "@tasit/account";
import { ethers } from 'ethers';
import { Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';
import Login from './SignIn'
import {LinearGradient} from 'expo-linear-gradient'

import * as Random from "expo-random";

export default function App() {
  
  const { width } = Dimensions.get('window');
  
  return (
    <Home></Home>
  )

}

class Home extends React.Component {
  state = {
    accessToken: "",
    message: "Awaiting accesstoken",
    address: "",
    account: undefined
  };

  async componentDidMount() {
    const accountString = await this._retrieveData('account')

    if(!accountString) {
      this.getAccount();
    } else {
      this.setAccount(accountString);
    }
  }

  async getAccount() {
    async function makeAccount() {
      const randomBytes = await Random.getRandomBytesAsync(16);
  
      const account = Account.createUsingRandomness(randomBytes);
      const address = account.address;
      return {address, account}
    }
    const {address, account} = await makeAccount();
    this._storeData('account', JSON.stringify(account))

    this.setState({address: address, account: account})
  }

  setAccount(accountString: string) {
    const account = JSON.parse(accountString)
    console.log(account)
    this.setState({address: account.signingKey.address, account: account})
  }

  _storeData = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(
        key,
        value
      );
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return (
          <Login account={this.state.account}></Login>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    //backgroundColor: '#282c34',
    color: 'whitesmoke',
  },

linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    borderRadius: 5
  },

  AppHeader: {
    backgroundColor: '#282c34',
    // min-height: 80vh;
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // font-size: calc(10px + 2vmin);
    color: 'white'
  }
});