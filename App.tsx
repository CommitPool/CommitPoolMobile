import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import logo from './strava-2.svg';
import {vmin} from 'react-native-expo-viewport-units';
import config from './app.config.js'

var strava = require("strava-v3");
var axios = require("axios");
var moment = require("moment");

class App extends React.Component {
  state = {
    accessToken: "",
    message: "Awaiting accesstoken",
  };

  async componentDidMount() {
    this.getAccesstoken();
  }

  // Use env credentials to call Strava API and get access token to API calls for user data
  // TODO replace refresh_token via call to DB
  getAccesstoken = async () => {
    console.log('proc', process.env)

    axios
      .post("https://www.strava.com/api/v3/oauth/token", {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: config.refreshToken,
        grant_type: "refresh_token",
      })
      .then((res) => {
        this.storeAccessToken(res);
      });
  };

  storeAccessToken = async (res) => {
    console.log(res.data.access_token);
    let _accessToken = res.data.access_token;
    if (!_accessToken.length > 0) throw new Error("AccessToken is empty");
    axios
      .post('http://localhost:4001/tokens/create', {
        token: _accessToken,
        userId: process.env.REACT_APP_CLIENT_ID
      })
      .then(res => {
        console.log("Response from db:", res)
        this.updateAccessToken(_accessToken)
      })
      .catch(error => console.error(`There was an error creating the token for ${process.env.REACT_APP_CLIENT_ID}: ${error}`))
  }

  //Update access token
  updateAccessToken = async (token) => {
    console.log("Passed to update", token)
    if (!token.length > 0) throw new Error("AccessToken is empty");
    this.setState({ accessToken: token, 
                    message: "AccessToken updated" }, () => console.log(this.state.accessToken));
  }

  activityExternalAdapter = async (req, res) => {
    try {
      var _accessToken = this.state.accessToken;
      if (!_accessToken.length > 0) throw new Error("AccessToken is empty");

      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      // Get all activities for user based on ID and active accesstoken
      const activities = await strava.athlete.listActivities({
        access_token: this.state.accessToken,
        id: process.env.REACT_APP_USER_ID,
      });
      console.log(req.body);

      // 1. Filter out activities relevant for commitment activity and period
      // 2. Reduce activity distances
      const totalDistance = activities
        .filter((act) => {
          const endTime =
            (moment(act.start_date).unix() + act.elapsed_time) * 1000;
          return (
            act.type === req.body.data.type &&
            endTime < req.body.data.endTime &&
            endTime > req.body.data.startTime
          );
        })
        .map((act) => act.distance)
        .reduce(reducer);

      let returnData = {
        jobRunID: req.body.id,
        data: totalDistance,
      };

      // Return distance for jobRunID
      res.send(returnData);
    } catch (error) {
      let errorData = {
        jobRunID: req.body.id,
        status: "errored",
        error: error,
      };
      res.status(500).send(errorData);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.AppHeader}>
          <img src={logo} style={{height: vmin(40)}} alt="logo" />
          <h1>Strava Client</h1>
          {/* <h2>{this.state.message}</h2> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#282c34',
    color: 'whitesmoke',
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

export default App;