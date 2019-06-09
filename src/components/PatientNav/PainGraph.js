

import React from 'react'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import { BarChart, XAxis, LineChart, Grid } from 'react-native-svg-charts'
import { View, ScrollView, Dimensions, Text } from 'react-native';
import * as scale from 'd3-scale';
import firebase from "firebase";
import * as shape from 'd3-shape';

class PainGraph extends React.PureComponent {

    constructor(props){
      super(props);
      this.state = {
        data: [ 10, 10, 28, 60, 75, 68, 69, 24, 18, 28, 60, 75, 68, 69, 24, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
        paindata: [ 0, 10,8, 10, 75, 68, 69, 24, 18, 28, 60, 75, 68, 69, 24, 10, 10, 60, 10, 10, 70, 10, 10, 35, 54, 29, 15, 10 ],
      }
      this.getdata()
    }

    getdata(){
      var userId = this.props.id;
      var firebaseRef = firebase.database().ref('/Patients/Testing/' + userId);
      return firebaseRef.once('value')
        .then((dataSnapshot) => {
          console.log('getting data', dataSnapshot.val());
          this.setState({ data: dataSnapshot.val().data });
        }
      );
    }

    componentDidMount(){
      //this.getdata()
    }

    render() {

          const paindata = this.state.paindata

          const Gradient = () => (
              <Defs key={'gradient'}>
                  <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                      <Stop offset={'0%'} stopColor={'rgb(240, 50, 50)'}/>
                      <Stop offset={'50%'} stopColor = {"#FFFF00"}/>
                      <Stop offset={'100%'} stopColor={"#7ccc9c"}/>
                  </LinearGradient>
              </Defs>
          )

          var d = new Date();
          var n = d.getDay();

          const day = [ 'Mon', 'Tue','Wed','Thu','Fri','Sat','Sun' ]
          const dataset = this.state.data


          var colour = ["#7ccc9c"]

          for(var i = 1; i < 28; i++){
            if (this.props.currentday == i){
              colour.push('rgb(240, 64, 122)')
            }
            else if (dataset[i] > dataset[i-1]){
              colour.push('rgb(69, 204, 122)')
            } else {
              colour.push("#7ccc9c")
            }
          }

          const data1 = [ dataset[0] ]
            .map((value) => ({ value }))
          const data2 = [ dataset[1] ]
            .map((value) => ({ value }))
          const data3 = [ dataset[2] ]
            .map((value) => ({ value }))
          const data4 = [ dataset[3] ]
            .map((value) => ({ value }))
          const data5 = [ dataset[4] ]
            .map((value) => ({ value }))
          const data6 = [ dataset[5] ]
            .map((value) => ({ value }))
          const data7 = [ dataset[6] ]
            .map((value) => ({ value }))
          const data8 = [ dataset[7] ]
            .map((value) => ({ value }))
          const data9 = [ dataset[8] ]
            .map((value) => ({ value }))
          const data10 = [ dataset[9] ]
            .map((value) => ({ value }))
          const data11 = [ dataset[10] ]
            .map((value) => ({ value }))
          const data12 = [ dataset[11] ]
            .map((value) => ({ value }))
          const data13 = [ dataset[12] ]
            .map((value) => ({ value }))
          const data14 = [ dataset[13] ]
            .map((value) => ({ value }))
          const data15 = [ dataset[14] ]
            .map((value) => ({ value }))
          const data16 = [ dataset[15] ]
            .map((value) => ({ value }))
          const data17 = [ dataset[16] ]
            .map((value) => ({ value }))
          const data18 = [ dataset[17] ]
            .map((value) => ({ value }))
          const data19 = [ dataset[18] ]
            .map((value) => ({ value }))
          const data20 = [ dataset[19] ]
            .map((value) => ({ value }))
          const data21 = [ dataset[20] ]
            .map((value) => ({ value }))
          const data22 = [ dataset[21] ]
            .map((value) => ({ value }))
          const data23 = [ dataset[22] ]
            .map((value) => ({ value }))
          const data24 = [ dataset[23] ]
            .map((value) => ({ value }))
          const data25 = [ dataset[24] ]
            .map((value) => ({ value }))
          const data26 = [ dataset[25] ]
            .map((value) => ({ value }))
          const data27 = [ dataset[26] ]
            .map((value) => ({ value }))
          const data28 = [ dataset[27] ]
            .map((value) => ({ value }))



          const barData = [
              {
                  data: data1,
                  svg: {
                      fill: colour[0],
                      onPress: () => this.props.callbackFromParent('0'),
                  },
              },
              {
                  data: data2,
                  svg: {
                      fill: colour[1],
                      onPress: () => this.props.callbackFromParent('1'),
                  },
              },
              {
                  data: data3,
                  svg: {
                      fill: colour[2],
                      onPress: () => this.props.callbackFromParent('2'),
                  },
              },
              {
                  data: data4,
                  svg: {
                      fill: colour[3],
                      onPress: () => this.props.callbackFromParent(3),
                  },
              },
              {
                  data: data5,
                  svg: {
                      fill: colour[4],
                      onPress: () => this.props.callbackFromParent(4),
                  },
              },
              {
                  data: data6,
                  svg: {
                      fill: colour[5],
                      onPress: () => this.props.callbackFromParent(5),
                  },
              },
              {
                  data: data7,
                  svg: {
                      fill: colour[6],
                      onPress: () => this.props.callbackFromParent(6),
                  },
              },
              {
                  data: data8,
                  svg: {
                      fill: colour[7],
                      onPress: () => this.props.callbackFromParent('7'),
                  },
              },
              {
                  data: data9,
                  svg: {
                      fill: colour[8],
                      onPress: () => this.props.callbackFromParent('8'),
                  },
              },
              {
                  data: data10,
                  svg: {
                      fill: colour[9],
                      onPress: () => this.props.callbackFromParent(9),
                  },
              },
              {
                  data: data11,
                  svg: {
                      fill: colour[10],
                      onPress: () => this.props.callbackFromParent(10),
                  },
              },
              {
                  data: data12,
                  svg: {
                      fill: colour[11],
                      onPress: () => this.props.callbackFromParent(11),
                  },
              },
              {
                  data: data13,
                  svg: {
                      fill: colour[12],
                      onPress: () => this.props.callbackFromParent(12),
                  },
              },
              {
                  data: data14,
                  svg: {
                      fill: colour[13],
                      onPress: () => this.props.callbackFromParent('13'),
                  },
              },
              {
                  data: data15,
                  svg: {
                      fill: colour[14],
                      onPress: () => this.props.callbackFromParent('14'),
                  },
              },
              {
                  data: data16,
                  svg: {
                      fill: colour[15],
                      onPress: () => this.props.callbackFromParent('15'),
                  },
              },
              {
                  data: data17,
                  svg: {
                      fill: colour[16],
                  },
              },
              {
                  data: data18,
                  svg: {
                      fill: colour[17],
                  },
              },
              {
                  data: data19,
                  svg: {
                      fill: colour[18],
                  },
              },
              {
                  data: data20,
                  svg: {
                      fill: colour[19],
                  },
              },
              {
                  data: data21,
                  svg: {
                      fill: colour[20],
                  },
              },
              {
                  data: data22,
                  svg: {
                      fill: colour[21],
                  },
              },
              {
                  data: data23,
                  svg: {
                      fill: colour[22],
                  },
              },
              {
                  data: data24,
                  svg: {
                      fill: colour[23],
                  },
              },
              {
                  data: data25,
                  svg: {
                      fill: colour[24],
                  },
              },
              {
                  data: data26,
                  svg: {
                      fill: colour[25],
                  },
              },
              {
                  data: data27,
                  svg: {
                      fill: colour[26],
                  },
              },
              {
                  data: data28,
                  svg: {
                      fill: colour[27],
                  },
              },
          ]

          return (
            <ScrollView horizontal={true}
                        snapToAlignment = 'end'
                        ref= "scrollref"
                        onContentSizeChange={()=> this.refs.scrollref.scrollToEnd()}>
              <View>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14, textAlign: 'right'}}> {'Distance   ' }</Text>
              <BarChart
                  style={ { height: 0.4 * Dimensions.get('window').width, width: (Dimensions.get('window').width)*4, } }
                  data={ barData }
                  yAccessor={({ item }) => item.value}
                  svg={{
                      fill: 'green',
                  }}
                  contentInset={ { top: 30, bottom: 10 } }
                  { ...this.props }
                  spacingInner = { 0.00 }
                  spacingOuter = { 0.00 }
              >
              <XAxis
                  style={{ marginTop: 10 }}
                  data={ barData }
                  scale={ scale.scaleBand }
                  formatLabel={ (value, index) => day[(index + n) % 7] }
                  labelStyle={ { color: 'black' } }
              />
              </BarChart>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 14, textAlign: 'right'}}> {'Pain    '} </Text>
              <LineChart
                  style={ { height: 0.4 * Dimensions.get('window').width, width: (Dimensions.get('window').width)*4, } }
                  data={ paindata }
                  curve={ shape.curveNatural }
                  yMin = { 0 }
                  yMax = { 100 }
                  contentInset={ { top: 10, bottom: 10 } }
                  svg={{
                      strokeWidth: 2,
                      stroke: 'url(#gradient)',
                  }}
              >
                  <Grid/>
                  <Gradient/>
              </LineChart>
              </View>
            </ScrollView>
          )
    }
};

export default PainGraph
