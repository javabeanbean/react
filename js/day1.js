import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

function timeFormat(time) {
    var msec = Math.floor((time % 1000) / 10);
    var sec = Math.floor(time / 1000) % 60;
    var min = Math.floor(Math.floor(time / 1000) / 60);
    var coverPosition = function(num) {
        if (Math.floor(num / 10) === 0) {
            return '0' + num;
        } else {
            return num;
        }
    }
    return coverPosition(min) + ':' + coverPosition(sec) + '.' + coverPosition(msec);
}

export default class Day1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            running: true,
            time: 0,

            res:[]
        };
    }


    componentWillMount() {
        console.log('componentDidMount called');
        this.res = [];
    }
    render() {
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
        console.log(this.res.length);
        return (
            <View style={ {
                backgroundColor: 'white',
                flex: 1
            }}>
              <View style={ styles.titleContainer }>
                <Text style={ styles.title }>
                  mywatch
                </Text>
              </View>
              <View style={ styles.timerContainer }>
                <Text style={ styles.smallTimer }>
                  { timeFormat(this.state.time)}
                </Text>
                <Text style={ styles.bigTimer }>
                  { timeFormat(this.state.time)}
                </Text>
              </View>
              <View style={ styles.mainContainer }>
                <Svg
            height={ svgHeight }
            width={ screenWidth }>
                  <G onPress={ () => {
                // this.res.push({
                //     name: '计次' + (this.res.length + 1),
                //     value: timeFormat(this.state.time)
                // });
                // //产生不同的res实例以便FlatList刷新
                // this.res = this.res.slice();
                // // this.flatlist.scrollToIndex({viewPosition:1, index: this.res.length-1});
                // // this.flatlist.scrollToEnd();

                 this.setState((previousState) => {
                    previousState.res.push({name:1,value:1});
                    return {
                        res: previousState.res.slice()
                    };
                });
            }}>
                    <Circle
            cx={ offsetX }
            cy={svgHeight / 2}
            r={ radius }
            stroke='black'
            fill='none'
            strokeWidth='1' />
                    <SvgText
            fontSize={ fontSize.toString()}
            x={ left_font_x }
            y={ font_y }>
                      { leftFont }
                    </SvgText>
                  </G>
                  <G onPress={ () => {
                setInterval(() => {
                    this.setState((previousState) => ({
                        time: previousState.time + 10
                    }));
                }, 10);
            }}>
                    <Circle
            cx={screenWidth - offsetX}
            cy={svgHeight / 2}
            r={ radius }
            stroke='black'
            fill='none'
            strokeWidth='1' />
                    <SvgText
            fontSize={ fontSize.toString()}
            x={ right_font_x }
            y={ font_y }>
                      { rightFont }
                    </SvgText>
                  </G>
                </Svg>
                <View style={ styles.resultContainer }>
                  <FlatList
            data={ this.state.res }
              getItemLayout={(data, index) => ( {length: 50, offset: 50 * index, index} )}
              ref={(flatlist)=>this.flatlist=flatlist}
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
            }} />
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
