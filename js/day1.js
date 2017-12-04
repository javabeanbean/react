import React, { Component } from 'react';

import { StyleSheet, Text, View, ART } from 'react-native';
const {Surface, Shape, Path,Group} = ART;
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class Day1 extends Component {
    render() {
        //两点及半径决定一个圆
        var leftCircle = Path().moveTo(100, 50).arc(0, 50, 25);
        var rightCircle = Path().moveTo(screenWidth - 100, 50).arc(0, 50, 25);
        return (
            <View style={ { backgroundColor: 'white', flex: 1 } }>
              <View style={ styles.titleContainer }>
                <Text style={ styles.title }>
                  mywatch
                </Text>
              </View>
              <View style={ styles.timerContainer }>
              </View>
              <View style={ styles.mainContainer }>
                <Surface
                         width={ screenWidth }
                         height={ 150 }>
                  <Group>
                    <Shape
                           d={ leftCircle }
                           stroke='black'
                           strokeWidth={ 1 } />
                    <ART.Text
                              strokeWidth={ 1 }
                              stroke='black'
                              font="10px Heiti SC"
                              fill='black'
                              x={ 100 }
                              y={ 75 }
                              onLayout={({nativeEvent:e})=>{console.log(e);}}
                              >
                      Swipe
                    </ART.Text>
                  </Group>
                  <Shape
                         d={ rightCircle }
                         stroke='black'
                         strokeWidth={ 1 } />
                </Surface>
                <View style={ styles.resultContainer }>
                </View>
              </View>
            </View>


            );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    // textAlign: 'center',
    //do not work
    // textAlignVertical: 'bottom',
    // includeFontPadding :false
    },
    timerContainer: {
        height: 140,
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    mainContainer: {
        flex: 1
    },
    resultContainer: {
        backgroundColor: 'green',
        flex: 1
    }

});