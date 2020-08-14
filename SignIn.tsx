import React, { Component } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { WebView } from 'react-native-webview';
import config from './app.config.js'

const CLIENT_ID = config.clientId
const URL_SHEME_PREFIX = config.clientSecret
const URL_SHEME_HOST = config.refreshToken
const CALL_BACK_URL_SHEME = `${URL_SHEME_PREFIX}://${URL_SHEME_HOST}/main`;
const INITIAL_URI = `https://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=read`;

export default class Login extends Component <{}, {step: Number}> {
  constructor(props) {
    super(props);
    this.state = {
      step: 1
    };
  }

  onShouldStartLoadWithRequest = url => {
    if (this.webView !== null) {
      if (!url.startsWith(CALL_BACK_URL_SHEME)) {
        this.setState(() => ({ visible: true }));
      } else {
        this.setState(() => ({ visible: false }));
      }
    }
    return true;
  };

  onClick = (step: Number) => {
    this.setState({step: step})
  }

  renderSwitch = () => {
    switch(this.state.step) {
        case 1:
          return (
          <View style={{backgroundColor: '#D45353', flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
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
        </View>)
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
        default:
          return (
            <Image
                style={{width: 100 + '%', height: 100 + '%'}}
                source={require('./assets/2.png')}
            />
          )
      }
  }

  render() {
    const iframe = '<iframe height="265" style="width: 100%;" scrolling="no" title="fx." src="' + INITIAL_URI + '" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>'; 
    console.log(INITIAL_URI)
    // if (!this.state.visible) {
    //   currentStyles.push(styles.hide);
    // }

    return (
        // <Text>hi</Text>
        // <WebView
        //   source={{ uri: 'https://github.com/facebook/react-native' }}
        // />
        // <Iframe iframe={iframe} />
        <View style={{flex: 1}}>
            {this.renderSwitch()}
        </View>

    );
  }
}


function Iframe(props) {
    return  (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
}


const styles = StyleSheet.create({
    login: {
      marginTop: 20,
      flex: 1
    },
    hide: {
      overflow: "hidden",
      flex: -1
    }
  });