import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import Commit from './Commit'
import Track from './Track'
import MakeCommitment from './MakeCommitment'
import Complete from './Complete'
import Wallet from './Wallet'
import { Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'

export default class Login extends Component <{account: any}, {step: Number, account: any}> {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      account: undefined
    };
  }

  onClick = (step: Number) => {
    this.setState({step: step})
  }

  renderSwitch = () => {
    switch(this.state.step) {
        case 1:
          return (
            <LinearGradient
            colors={['#D45353', '#D45353', 'white' ]}
            style={styles.linearGradient}
            >
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        style={{width: 200, height: 200}}
                        source={require('./assets/commit.png')}
                    />
                    <Text style={{ color: 'white', fontSize: 50}}>
                        CommitPool
                    </Text>
                </View>
                <TouchableOpacity onPress={() => this.onClick(2)}>
                    <Image
                        style={{width: 300, height: 50}}
                        source={require('./assets/strava.svg')}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>)
        case 2:
          return (
            <View style={{width: 100 + '%', height: 100 + '%'}}>
                <TouchableOpacity onPress={() => this.onClick(3)} style={{width: 100 + '%', height: 100 + '%'}}>
                    <Image
                        style={{width: 100 + '%', height: 100 + '%'}}
                        source={require('./assets/1.png')}
                    />
                </TouchableOpacity>
            </View>
          )
        case 3:
          return (
            <View style={{width: 100 + '%', height: 100 + '%'}}>
                <TouchableOpacity onPress={() => this.onClick(4)} style={{width: 100 + '%', height: 100 + '%'}}>
                <Image
                    style={{width: 100 + '%', height: 100 + '%'}}
                    source={require('./assets/2.png')}
                />
                </TouchableOpacity>
            </View>
            
          )
        case 4:
            return (
 		<LinearGradient
          colors={['#D45353', '#D45353', 'white' ]}
          style={styles.linearGradient}
        >
                <Wallet next={this.onClick} account={this.props.account}></Wallet>
	</LinearGradient>
            )
        case 5:
            return (
		<LinearGradient
          		colors={['#D45353', '#D45353', 'white' ]}
          		style={styles.linearGradient}
        		>
                <Commit next={this.onClick}></Commit>
		</LinearGradient>
            )
        case 6:
            return (
			<LinearGradient
          		colors={['#D45353', '#D45353', 'white' ]}
          		style={styles.linearGradient}
        		>
                <MakeCommitment next={this.onClick} account={this.props.account}></MakeCommitment>
</LinearGradient>
            )
        case 7:
            return (
                <Track next={this.onClick} account={this.props.account}></Track>
            )
        case 8:
            return (
                <Complete next={this.onClick} account={this.props.account}></Complete>
            )
      }
  }

  render() {
    return (
        <View style={{flex: 1}}>
            {this.renderSwitch()}
        </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height,
    borderRadius: 5
  }

});