import React, { Component } from 'react';

import { StyleSheet, Text, View, ART } from 'react-native';
const {Surface, Shape, Path} = ART;
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

export default class Day1 extends Component {
    render() {
        var shapes = new Array(6).fill().map((d, i) => {
            var path = Path().moveTo(0, i * 50 ).lineTo(screenWidth, i * 50 );
            return <Shape d={path} key={i} stroke='white' strokeWidth={1} strokeDash={[10, 5]}/>;
        });

        return (
            <View style={{
                backgroundColor: 'green',
                flex: 1
            }}>
            <Surface width={screenWidth} height={300}>
           {shapes}
            </Surface>
            </View>
        );
    }
}

