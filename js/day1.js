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
  };
  return coverPosition(min) + ':' + coverPosition(sec) + '.' + coverPosition(msec);
}

export default class Day1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      time: 0
    };
  }

  componentWillMount() {
    // console.log('componentDidMount called');
    this.res = [];
  }
  render() {
    // console.log(this.res.length);
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
            <TimerContainer time={{s:this.state.time,b:this.res.reduce((prev,curr)=>prev+curr.value,this.state.time)}}/>
            <View style={ styles.mainContainer }>
            <MySvg runState={this.state.running} initState={this.state.time||this.res.length} 
                events = {
                    {
                        onStart: () => {
                            this.setState({running:true});
                            this.timerID=setInterval(() => {
                                this.setState((previousState) => ({
                                    time: previousState.time + 10
                                }));
                            }, 10);
                        },
                        onStop: () => {
                            this.setState({running:false});
                            clearInterval(this.timerID);
                        },
                        onMeter: () => {
                            this.setState({time:0});
                            this.res.unshift({
                                name: '计次' + (this.res.length + 1),
                                value: this.state.time
                            });
                            //产生不同的res实例以便FlatList刷新
                            this.res = this.res.slice();
                            // this.flatlist.scrollToIndex({viewPosition:1, index: this.res.length-1});
                            // this.flatlist.scrollToEnd();
                        },
                        onReset: () => {
                            this.setState({time:0});
                            this.res=[];
                        }
                    }
                }
                />
            <View style={ styles.resultContainer }>
                <FlatList
                  data={ this.res }
                  //刷新频繁时用getItemLayout会卡
                  // getItemLayout={(data, index) => ( {length: 50, offset: 50 * index, index} )}
                  keyExtractor={(item, index) => index}
                  ref={(flatlist) => this.flatlist = flatlist}
                  renderItem={ ({item}) => <ResultItem name={item.name} value={item.value}/>} />
            </View>
            </View>
    </View>
      );
  }
}

class TimerContainer extends Component {
  render() {
    return (
      <View style={ styles.timerContainer }>
                <Text style={ styles.smallTimer }>
                  { timeFormat(this.props.time.s)}
                </Text>
                <Text style={ styles.bigTimer }>
                  { timeFormat(this.props.time.b)}
                </Text>
              </View>
      );
  }
}

class MySvg extends Component {
  render() {
    const offsetX = 100;
    const radius = 50;
    const svgHeight = 120;
    const fontSize = 20;
    var leftFont;
    var leftEvent;
    var rightFont;
    var rightEvent;
    var init=false;
    if (this.props.runState) {
        leftFont='计次';
        leftEvent=this.props.events.onMeter;
        rightFont='停止';
        rightEvent=this.props.events.onStop;
    }else{
        if (this.props.initState) {
          leftFont='复位';
          leftEvent=this.props.events.onReset;
        }else{
           leftFont='计次';
           init=true;
        }
        rightFont='启动';
        rightEvent=this.props.events.onStart;
    }

    //20和10是根据font 10px和字数取的大概宽高
    var left_font_x = offsetX - fontSize * leftFont.length / 2;
    var right_font_x = screenWidth - offsetX - fontSize * rightFont.length / 2;
    var font_y = svgHeight / 2 - fontSize / 2;
    return (
        <Svg
      height={ svgHeight }
      width={ screenWidth }>
            <MyG cx={offsetX} cy={svgHeight / 2} r={radius} fontSize={fontSize} x={left_font_x} y={font_y} txt={leftFont} init={init} event={leftEvent}/>
            <MyG cx={screenWidth - offsetX} cy={svgHeight / 2} r={radius} fontSize={fontSize} x={right_font_x} y={font_y} txt={rightFont} event={rightEvent}/>
        </Svg>
      );
  }
}

class MyG extends Component {
  render() {
    return (
      <G onPress={ () =>this.props.event&&this.props.event()}>
        <Circle
          cx={ this.props.cx }
          cy={this.props.cy}
          r={ this.props.r }
          stroke='black'
          fill={this.props.init?'lightgray':'none'}
          strokeWidth='1' />
        <SvgText
          fontSize={ this.props.fontSize}
          x={ this.props.x }
          y={ this.props.y }>
            { this.props.txt }
        </SvgText>
        </G>
      );
  }
}

class ResultItem extends Component {
  render() {
    return (
      <View style={ styles.resultItem }>
           <Text>
             { this.props.name }
           </Text>
           <Text>
             {timeFormat( this.props.value )}
           </Text>
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
