import React, { Component } from 'react';

import { StyleSheet, Text, View, ART } from 'react-native';

export default class Day1 extends Component {
    render() {
        const path=ART.Path();
        path.moveTo(1,1);
        path.lineTo(300,100);
        return (
        	 <View style={{
                backgroundColor: 'green',
                flex:1
            }}>
            <ART.Surface width={300} height={300}>
            <ART.Shape d={path} stroke='white' strokeWidth={1} />
            </ART.Surface>
            </View>
        );
    }
}

