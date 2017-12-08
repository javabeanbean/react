import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

function timeFormat (time) {
   var sec=time/1000;
   var min=sec/60;
   
}

export default class Day1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            running: true,
            time: 0
        };
    }


    componentDidMount() {}
    render() {
        var res = [{
            name: 1,
            value: 1
        }, {
            name: 2,
            value: 2
        }];
        const offsetX = 100,
            radius = 50,
            svgHeight = 120,
            fontSize = 20,
            leftFont = '计次',
            rightFont = '启动';
        //20和10是根据font 10px和字数取的大概宽高
        var left_font_x = offsetX - fontSize * leftFont.length / 2;
        var right_font_x = screenWidth - offsetX - fontSize * rightFont.length / 2;
        var font_y = svgHeight / 2 - fontSize / 2;
        return (
            <View style={ { backgroundColor: 'white', flex: 1 } }>
              <View style={ styles.titleContainer }>
                <Text style={ styles.title }>
                  mywatch
                </Text>
              </View>
              <View style={ styles.timerContainer }>
                <Text style={ styles.smallTimer }>
                  00:99.69
                </Text>
                <Text style={ styles.bigTimer }>
                  {}
                </Text>
              </View>
              <View style={ styles.mainContainer }>
                <Svg
                     height={ svgHeight }
                     width={ screenWidth }>
                  <G onPress={ () => {
                                          Alert.alert('message')
                                      } }>
                    <Circle
                            cx={ offsetX }
                            cy={ svgHeight / 2 }
                            r={ radius }
                            stroke='black'
                            fill='none'
                            strokeWidth='1'
                             />
                    <SvgText
                             fontSize={ fontSize.toString() }
                             x={ left_font_x }
                             y={ font_y }>
                      { leftFont }
                    </SvgText>
                  </G>
                  <G onPress={ () => {
                                          setInterval(()=>{
                                            this.setState((previousState)=>({time:previousState.time+1}));
                                          }, 10);
                                      } }>
                    <Circle
                            cx={ screenWidth-offsetX }
                            cy={ svgHeight / 2 }
                            r={ radius }
                            stroke='black'
                            fill='none'
                            strokeWidth='1'
                             />
                    <SvgText
                             fontSize={ fontSize.toString() }
                             x={ right_font_x }
                             y={ font_y }>
                      { rightFont }
                    </SvgText>
                  </G>
                </Svg>
                <View style={ styles.resultContainer }>
                  <FlatList
                            data={ res }
                            renderItem={ ({item}) => {
                                             return (
                                                 <View style={ styles.resultItem }>
                                                   <Text>
                                                     { item.name }
                                                   </Text>
                                                   <Text>
                                                     { item.value }
                                                   </Text>
                                                 </View>
                                                 );
                                         } } />
                </View>
              </View>
            </View>


            );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    // textAlign: ,
    //do not work
    // textAlignVertical: 'bottom',
    // includeFontPadding :false
    },
    timerContainer: {
        height: 120,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        justifyContent: 'center'
    },
    smallTimer: {
        paddingRight: 80,
        fontSize: 15,
        textAlign: 'right',
        color: 'black'
    },
    bigTimer: {
        fontSize: 60,
        textAlign: 'center',
        color: 'black'
    },
    mainContainer: {
        flex: 1
    },
    resultContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
    resultItem: {
        width: screenWidth - 10,
        height: 50,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30
    }

});
