import React, { Component } from 'react';

import { StyleSheet, Text, View, ART } from 'react-native';
const {Surface, Shape, Path} = ART;
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

export default class Day1 extends Component {
    render() {
        var path=Path().moveTo(50,0).arc(0,90,45);

        return (
            <View style={{
                backgroundColor: 'white',
                flex: 1
            }}>
            <Surface width={screenWidth} height={300}>
           <Shape d={path} stroke='black' strokeWidth={1} />
            </Surface>
            </View>
        );
    }
}

