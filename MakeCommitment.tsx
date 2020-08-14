import React, { Component } from "react";
import { View, StyleSheet, Image, Text, Button, TouchableOpacity, TextInput } from "react-native";

export default class MakeCommitment extends Component <{next: any}, {step: Number}> {
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
            <View style={{alignItems: 'center'}}>
                <View style={{flexDirection: "row", width: 200, padding: 10}}>
                    <Text style={{flexGrow: 1}}>Activity:</Text>
                    <Text style={{flexGrow: 1}}>Run 🏃‍♂️</Text>
                </View>
                <View style={{flexDirection: "row", width: 200, padding: 10}}>
                    <Text style={{flexGrow: 1}}>Distance:</Text>
                    <TextInput style={{backgroundColor: 'white', width: 100}}></TextInput>
                </View>
                <View style={{flexDirection: "row", width: 200, padding: 10}}>
                    <Text style={{flexGrow: 1}}>Stake:</Text>
                    <TextInput style={{backgroundColor: 'white', width: 100}}></TextInput>
                </View>
                <View style={{flexDirection: "row", width: 200, padding: 10}}>
                    <Text style={{flexGrow: 1}}>End Time:</Text>
                    <Text style={{flexGrow: 1}}>8/24 12:00 UTC</Text>
                </View>
            </View>


            {/* <Text style={{ color: 'white', fontSize: 50, textAlign: 'center'}}>
                
            </Text> */}
            <TouchableOpacity
                    style={{width: 300, height: 50, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.props.next(5)}>
                <Text style={{fontSize: 30  }}>Next</Text>
            </TouchableOpacity>
        </View>
    );
  }
}