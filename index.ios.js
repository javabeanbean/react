/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import codePush from 'react-native-code-push';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Day1 from './js/day1';

export default class MyApp extends Component {
  render() {
    return (
       <Day1/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

MyApp = codePush(MyApp);
AppRegistry.registerComponent('MyApp', () => MyApp);
