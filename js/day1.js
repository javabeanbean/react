import React, { Component } from 'react';

import { StyleSheet, Text, View, FlatList, ART } from 'react-native';
const {Surface, Shape, Path, Group} = ART;
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class Day1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: true
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
            surfaceHeight = 120,
            offsetY = (surfaceHeight - radius * 2) / 2;
        //android need only one arc while ios need two
        //两点及半径决定一个圆
        var leftCircle = Path().moveTo(offsetX, offsetY).arc(0, radius * 2, radius).arc(0, -radius * 2, radius);
        var rightCircle = Path().moveTo(screenWidth - offsetX, offsetY).arc(0, radius * 2, radius).arc(0, -radius * 2, radius);
        //20和10是根据font 10px和字数取的大概宽高
        var left_font_x = offsetX - 20 / 2;
        var right_font_x = screenWidth - offsetX - 20 / 2;
        var font_y = surfaceHeight / 2 - 10 / 2;
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
                         height={ surfaceHeight }>
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
                              x={ left_font_x }
                              y={ font_y }>
                      计次
                    </ART.Text>
                  </Group>
                  <Group>
                    <Shape
                           d={ rightCircle }
                           stroke='black'
                           strokeWidth={ 1 } />
                    <ART.Text
                              strokeWidth={ 1 }
                              stroke='black'
                              font="10px Heiti SC"
                              fill='black'
                              x={ right_font_x }
                              y={ font_y }>
                      启动
                    </ART.Text>
                  </Group>
                </Surface>
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
    // textAlign: 'center',
    //do not work
    // textAlignVertical: 'bottom',
    // includeFontPadding :false
    },
    timerContainer: {
        height: 120,
        borderBottomWidth: 1,
        borderTopWidth: 1
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