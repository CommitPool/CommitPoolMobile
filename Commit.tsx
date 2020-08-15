import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Button, TouchableOpacity } from "react-native";

export default class Commit extends Component <{next: any}, {step: Number}> {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  go = () => {

  }

  render() {
    return (
        <View style={{backgroundColor: '#D45353', flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
            <Text style={{ color: 'white', fontSize: 50, textAlign: 'center'}}>
                Hi Jeff,<br/>
                <br/>
                Ready to Commit?
            </Text>
            <TouchableOpacity
                    style={{width: 300, height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.props.next(6)}>
                <Text style={{fontSize: 30  }}>Let's Go!</Text>
            </TouchableOpacity>
        </View>
    );
  }
}